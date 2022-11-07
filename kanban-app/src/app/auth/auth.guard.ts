import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, switchMap, tap } from 'rxjs';
import { RouterStateValue } from '../enums';
import { selectFeatureUserLoggedIn } from '../redux/selectors/user.selectors';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store,
    private router: Router,
    private auth: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.handle();
  }

  handle() {
    const userId = this.auth.getUserId();
    return this.store.select(selectFeatureUserLoggedIn).pipe(
      map(x => (x ? x : this.router.parseUrl(RouterStateValue.welcome))),
      switchMap(x =>
        userId
          ? this.checkToken(
              userId,
              this.router.parseUrl(RouterStateValue.welcome)
            )
          : of(this.router.parseUrl(RouterStateValue.welcome))
      )
    );
  }

  checkToken(userId: string, url: UrlTree) {
    return this.auth.checkToken(userId, url);
  }
}
