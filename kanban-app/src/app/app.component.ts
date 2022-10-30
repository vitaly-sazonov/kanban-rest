import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfirmService } from './core/services/confirm.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  userResult?: Observable<boolean | null>; // it is for testing the modal window,then it should be deleted
  constructor(
    private confirmService: ConfirmService // it is for testing the modal window,then it should be deleted
  ) {}

  ngOnInit(): void {
    this.userResult = this.confirmService.getConfirmResult(); // it is for testing the modal window,then it should be deleted
  }
  callModal(info: string) {
    // it is for testing the modal window,then this method should be deleted
    this.confirmService.setConfirmInfo('SAMPLE_CONFIRM_INFO');
  }
}
