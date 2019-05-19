import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { AppState } from "../store/app.reducers";
import { Store } from "@ngrx/store";
import { State } from "./store/auth.reducers";
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>, 
        private router: Router){
        }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        return this.store.select('auth').pipe(map( auth => auth.authenticated))
    }
    

}