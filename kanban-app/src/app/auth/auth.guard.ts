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
    return this.handle();
  }

  handle() {
    return this.store.select(selectFeatureUserLoggedIn).pipe(
      map(x => {
        if (x) return x;
        this.router.navigate(['/login']);
        return false;
      })
    );
  }
}
