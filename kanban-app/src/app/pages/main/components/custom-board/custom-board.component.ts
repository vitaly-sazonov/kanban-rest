import { Component, Input, OnInit } from '@angular/core';
import { BOARDS } from 'src/app/constants';
import { CompareService } from 'src/app/core/services/compare.service';
import { HashService } from 'src/app/core/services/hash.service';
import { Board } from 'src/app/interfaces';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss'],
})
export class CustomBoardComponent {
  @Input() board?: Board;
  isShort = false;
  isPreview = false;

  constructor(private hash: HashService) {}

  changeStatus() {
    this.isPreview = true;
  }
}
