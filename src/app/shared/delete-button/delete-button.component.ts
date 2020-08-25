import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent {

  canDelete: boolean;

  @Output() delete = new EventEmitter<boolean>();

  prepareForDelete() {
    this.canDelete = true;
  }

  cancel() {
    this.canDelete = false;
  }

  remove() {
    this.delete.emit(true);
    this.canDelete = false;
  }
}
