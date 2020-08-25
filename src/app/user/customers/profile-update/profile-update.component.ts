import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})

export class ProfileUpdateComponent implements OnInit {

  form: FormGroup;
  errorMessage: string;
  loading: boolean = false;

  constructor(private fb: FormBuilder, public userService: UserService) { }

  async onSubmit() {
    if (this.form.invalid) {
      return
    }

    this.loading = true;
    const { displayName, photoURL } = this.form.value;

    try {
      await this.userService.update(displayName, photoURL);
      this.loading = false;
    }
    catch (e) {
      this.errorMessage = e;
      setTimeout(() => this.errorMessage = '', 2500);

      this.loading = false;
    }
  }

  ngOnInit(): void {
    const pattern = /^(http|https):/g;

    this.form = this.fb.group({
      displayName: [this.userService.currentUser.displayName],
      photoURL: [this.userService.currentUser.photoURL || '', [Validators.pattern(pattern)]],
    });
  }

}
