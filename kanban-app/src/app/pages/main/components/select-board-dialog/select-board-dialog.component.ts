import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CUSTOM_BOARDS } from 'src/app/custom-boards';
import { Board } from 'src/app/interfaces';

@Component({
  selector: 'app-select-board-dialog',
  templateUrl: './select-board-dialog.component.html',
  styleUrls: ['./select-board-dialog.component.scss'],
})
export class SelectBoardDialogComponent {
  boards = CUSTOM_BOARDS;
  constructor(
    public dialogRef: MatDialogRef<SelectBoardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  deleteUser(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}
