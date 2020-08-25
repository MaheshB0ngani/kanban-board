import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardComponent } from '../board-card/board.component';
import { Board } from '../board.interface';

@Component({
  selector: 'app-board-dialog',
  template: `
    <div ngClass="dialog-container">
      <h1 mat-dialog-title>Board</h1>

      <div mat-dialog-content>
          <p>What shall we call this board?</p>
          <br />
          <mat-form-field>
              <input placeholder="Title" matInput [(ngModel)]="data.title" />
          </mat-form-field>
      </div>
      <br />

      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="accent" [mat-dialog-close]="data.title" cdkFocusInitial>
          Create
        </button>
    </div>
  `,
  styles: [
    '.dialog-container { text-align: center; }',
    '.dialog-container button {margin: 8px}',
  ]
})
export class BoardDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<BoardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Board
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
