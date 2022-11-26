import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { CUSTOM_BOARDS } from 'src/app/custom-boards';
import { ConfirmQuestions, PercentSize } from 'src/app/enums';
import { Board } from 'src/app/interfaces';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-select-board-dialog',
  templateUrl: './select-board-dialog.component.html',
  styleUrls: ['./select-board-dialog.component.scss'],
})
export class SelectBoardDialogComponent {
  boards = CUSTOM_BOARDS;
  constructor(
    public dialogRef: MatDialogRef<SelectBoardDialogComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  createBoard(board: Board) {
    this.createCustomBoard(board);
  }

  createCustomBoard(board: Board) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      panelClass: 'dialog',
      enterAnimationDuration: '500ms',
      width: PercentSize.eighty,
      height: PercentSize.eighty,
      data: ConfirmQuestions.CreateBoard,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialogRef.close(board);
      }
    });
  }
}
