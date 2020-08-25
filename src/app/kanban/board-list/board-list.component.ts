import { Component, OnInit, OnDestroy } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';
import { Subscription } from 'rxjs';
import { Board } from '../board.interface';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-board-list',
  templateUrl: './board-list.component.html',
  styleUrls: ['./board-list.component.scss']
})

export class BoardListComponent implements OnInit, OnDestroy {

  boards: Board[];
  sub: Subscription;

  constructor(private boardService: BoardService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.boardService.getUserBoards().subscribe(
      data => this.boards = data || []
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.boardService.sortBoards(this.boards);
  }

  openBoardDialog(): void {
    const options = { width: '340px', data: {} };
    const dialogRef = this.dialog.open(BoardDialogComponent, options);

    dialogRef.afterClosed().subscribe(
      result => {
        if (!result) {
          return
        }
        const data = { title: result, priority: this.boards.length };
        this.boardService.createBoard(data);
      });
  }
}
