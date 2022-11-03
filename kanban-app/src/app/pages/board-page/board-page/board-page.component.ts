import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit, OnDestroy {
  id: string = '';
  subscription?: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscription = this.route.paramMap
      .pipe(switchMap(params => params.getAll('id')))
      .subscribe(data => (this.id = data));
    
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    
  }
}
