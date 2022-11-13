import { Injectable } from '@angular/core';
import { Board } from 'src/app/interfaces';
import { HashService } from './hash.service';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class CompareService {
  constructor(
    private storage: LocalstorageService,
    private hash: HashService
  ) {}

  setLastData() {}

  getLastData() {}

  checkIsUpdated(board: Board): boolean {
    return (
      this.storage.getBoardItem(board.id!) !=
      this.hash.getHash(JSON.stringify(board)).toString()
    );
  }

  checkIsNew(boardId: string): boolean {
    return !Boolean(this.storage.getBoardItem(boardId));
  }
}
