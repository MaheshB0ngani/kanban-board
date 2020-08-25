import { Component, OnInit } from '@angular/core';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

  errorMessage: string;
  loading: boolean = false;
  _imageFilename: string = '';
  imageAsFile;

  get imageFilename() { return this._imageFilename }

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  setImage(event) {
    const imageAsFile = event.target.files[0];
    const supportedFiles = ['jpeg', 'gif', 'png', 'apng', 'svg', 'png', 'jpg'];

    this._imageFilename = imageAsFile.name;

    if (!imageAsFile) {
      this.errorMessage = 'Please choose a file';
    }

    const fileSize = (imageAsFile.size / 1024) / 1024;
    if (fileSize >= 1) {
      this.errorMessage = 'File size should not be more than 1MB';
    }

    const fileExtension = imageAsFile.name.split('.').pop();
    if (!supportedFiles.includes(fileExtension)) {
      this.errorMessage = 'Unsupported file or image type';
    }

    this.imageAsFile = imageAsFile;
    this.errorMessage = '';
  }

  async submitHandler() {
    this.loading = true;

    try {
      await this.userService.uploadFile(this.imageAsFile);
      this.loading = false;
    }
    catch (e) {
      this.errorMessage = e;
      this.loading = false;
    }
  }

}
