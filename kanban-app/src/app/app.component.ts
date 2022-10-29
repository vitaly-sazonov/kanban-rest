import { Component, OnInit } from '@angular/core';
import { switchMap, tap } from 'rxjs';
import { user2 } from './constants';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kanban-app';

  constructor(private httpService: HttpService) {}
  ngOnInit(): void {
    this.httpService
      .signIn({
        login: 'user001',
        password: 'userpass@123',
      })
      .pipe(switchMap(() => this.httpService.getAllUsers()))
      .subscribe(x => console.log(x));
  }
}
