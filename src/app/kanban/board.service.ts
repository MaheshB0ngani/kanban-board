import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { switchMap } from 'rxjs/operators';
import { Board, Task } from './board.interface';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private auth: AngularFireAuth, private db: AngularFirestore) { }

  /**
   * Create a board for current user
   */
  async createBoard(data: Board) {
    const user = await this.auth.currentUser;
    return this.db.collection('boards')
      .add({
        ...data,
        uid: user.uid,
        tasks: [{ description: 'Hello!', label: 'yellow' }]
      });
  }

  /**
   * Delete a board
   */
  deleteBoard(boardID: string) {
    return this.db.collection('boards')
      .doc(boardID).delete();
  }

  /**
   * Update the task on board
   */
  updateTask(boardID: string, tasks: Task[]) {
    return this.db.collection('boards')
      .doc(boardID).update({ tasks });
  }

  /**
   * Remove a task from board
   */
  removeTask(boardID: string, task: Task) {
    return this.db.collection('boards')
      .doc(boardID).update({
        tasks: firebase.firestore.FieldValue.arrayRemove(task)
      });
  }

  /**
   * Get all boards created from current user
   */
  getUserBoards() {
    return this.auth.authState.pipe(

      switchMap(user => {
        if (!!user) {
          return this.db.collection<Board>('boards', ref =>
            ref.where('uid', '==', user.uid).orderBy('priority'))
            .valueChanges({ idField: 'id' })
        } else {
          return []
        }
      })
    );
  }

  /**
   * Run a batch write to change the priority of each boards for sorting when drag n drop 
   */
  sortBoards(boards: Board[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const refs = boards.map(board => db.collection('boards').doc(board.id));

    refs.forEach((ref, index) => batch.update(ref, { priority: index }));

    batch.commit();
  }
}
