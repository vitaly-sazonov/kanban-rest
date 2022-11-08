import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectFeatureIsLoading,
  selectFeatureUser,
  selectFeatureUserLoggedIn,
} from 'src/app/redux/selectors/user.selectors';
import { loginUser } from 'src/app/redux/actions/user.actions';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DEVELOPERS } from 'src/app/developers';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  userResult?: Observable<boolean | null | undefined>; // it is for testing the modal window,then it should be deleted
  user$ = this.store.select(selectFeatureUser);
  isLoading$ = this.store.select(selectFeatureIsLoading);
  loginStatus$ = this.store.select(selectFeatureUserLoggedIn);

  constructor(
    private store: Store,
    private confirmService: ConfirmService // it is for testing the modal window,then it should be deleted) // private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.userResult = this.confirmService.getConfirmResult(); // it is for testing the modal window,then it should be deleted
  }
}
