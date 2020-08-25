import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-task-dialog',
  template: `
    <div ngClass="dialog-container">
      <h1 mat-dialog-title>Create a new task</h1>

      <div mat-dialog-content>
          <p>What shall we do now?</p>
          <br />

          <mat-form-field>
              <textarea placeholder="Description" matInput [(ngModel)]="data.task.description"></textarea>
          </mat-form-field>
          <br />

          <mat-button-toggle-group [(ngModel)]="data.task.label">
              <mat-button-toggle *ngFor="let option of labelOptions" [value]="option">
                  <mat-icon [ngClass]="option">{{option === 'gray'? 'check_circle' : 'lens'}}</mat-icon>
              </mat-button-toggle>

          </mat-button-toggle-group>
      </div>
      <br />

      <app-delete-button (delete)="handleTaskDelete()"></app-delete-button>
      <button mat-raised-button color="accent" [mat-dialog-close]="data" cdkFocusInitial>
          {{ data.isNew ? 'Add Task' : 'Update Task' }}
      </button>
    </div>
  `,
  styles: [
    '.dialog-container { text-align: center; }',
    'button { margin: 8px; }',
    '.blue { color: #71deff; };',
    '.green { color: #36e9b6; };',
    '.yellow { color: #ffcf44; };',
    '.purple { color: #b15cff; };',
    '.gray { color: gray; };',
    '.red { color: #e74a4a; };',
  ]
})

export class TaskDialogComponent {

  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    private boardService: BoardService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleTaskDelete() {
    this.boardService.removeTask(this.data.boardID, this.data.task);
    this.dialogRef.close();
  }
}
