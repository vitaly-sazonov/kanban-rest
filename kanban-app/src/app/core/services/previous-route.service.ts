import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreviousRouteService {
  private prevRoute = new BehaviorSubject<string>('');
  comeFrom$ = this.prevRoute.asObservable();

  constructor() {}

  setPrevRoute(url: string) {
    this.prevRoute.next(url);
  }

  getPrevRoute() {
    return this.comeFrom$;
  }
}
