import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  onScroll$$ = new BehaviorSubject(0);
  scrollHeight$$ = new BehaviorSubject(0);
  constructor() {
    document.addEventListener('scroll', () => {
      this.scrollHeight$$.next(
        document.body.scrollHeight - document.body.offsetHeight
      );
      this.onScroll$$.next(window.pageYOffset);
    });
    document.addEventListener('mousemove', () => {
      this.scrollHeight$$.next(
        document.body.scrollHeight - document.body.offsetHeight
      );
      this.onScroll$$.next(window.pageYOffset);
    });
  }
  
  getPositionY() {
    return this.onScroll$$;
  }
  getScrollHeight() {
    return this.scrollHeight$$;
  }
}
