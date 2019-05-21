import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AppState } from "../store/app.reducers";
import { Store } from "@ngrx/store";
import { map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>, 
        private router: Router){
        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('auth').pipe(
            take(1),
            map( auth => auth.authenticated)
            )
    }
    

}