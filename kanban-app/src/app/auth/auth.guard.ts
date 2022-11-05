import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { RouterStateValue } from '../enums';
import { selectFeatureUserLoggedIn } from '../redux/selectors/user.selectors';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.handle(state.url);
  }

  handle(url: string) {
    return this.store.select(selectFeatureUserLoggedIn).pipe(
      map(x => {
        if (x) {
          console.log('true');
          return x;
        } else {
          console.log(false);
          return this.router.parseUrl(RouterStateValue.login);
        }
      })
    );
  }
}
