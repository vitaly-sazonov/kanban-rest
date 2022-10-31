import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isModalVisible = false;
  info$?: Observable<string | null | undefined>;
  buttonAgree = 'AGREE';
  buttonCancel = 'CANCEL';
  constructor(private confirmService: ConfirmService) {}

  ngOnInit(): void {
    this.info$ = this.confirmService.getConfirmInfo().pipe(
      tap(observable => {
        if (observable) {
          this.isModalVisible = true;
        }
      })
    );
  }

  setResult(result: boolean) {
    this.confirmService.setConfirmResult(result);
  }
}
