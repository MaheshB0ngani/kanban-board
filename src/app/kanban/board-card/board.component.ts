import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { BoardService } from '../board.service';
import { Board } from '../board.interface';
import { Task } from '../board.interface';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent {
  @Input() board: Board;

  constructor(private boardService: BoardService, private dialog: MatDialog) { }

  taskDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.boardService.updateTask(this.board.id, this.board.tasks)
  }

  openTaskDialog(task?: Task, idx?: number): void {
    const options = {
      width: '380px',
      data:
        task ? { task: { ...task }, isNew: false, boardID: this.board.id, idx } :
          { task: { label: 'purple' }, isNew: true }
    }
    const dialogRef = this.dialog.open(TaskDialogComponent, options);

    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) {
          return
        }

        if (result.isNew) {
          this.boardService.updateTask(this.board.id, [...this.board.tasks, result.task]);
        } else {
          const updatedTasks = this.board.tasks;
          updatedTasks.splice(result.idx, 1, result.task);
          this.boardService.updateTask(this.board.id, updatedTasks);
        }
      }
    )
  }


  handleDelete() {
    this.boardService.deleteBoard(this.board.id);
  }
}
