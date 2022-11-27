import { Component, HostListener, Input } from '@angular/core';
import { Board } from 'src/app/interfaces';

@Component({
  selector: 'app-custom-board',
  templateUrl: './custom-board.component.html',
  styleUrls: ['./custom-board.component.scss'],
})
export class CustomBoardComponent {
  @Input() board?: Board;
  showColumns = false;
  @HostListener('mouseenter') onMouseEnter() {
    this.showColumns = true;
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.showColumns = false;
  }
}
