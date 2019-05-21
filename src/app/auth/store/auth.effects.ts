import { Effect, Actions, ofType } from '@ngrx/effects'
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions'
import { map, switchMap, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { from } from 'rxjs'
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

    @Effect()
    authSignin = this.actions$.pipe( 
        ofType(AuthActions.TRY_SIGNIN),
        map((action: AuthActions.TrySignIn) => action.payload),
        switchMap((authData : {email: string, password: string}) => {
            return from(this.firebaseAuth.auth.signInWithEmailAndPassword(authData.email, authData.password));
        }),
        map( cred => {
            this.router.navigate(['/']);
            return new AuthActions.Signin(cred.user.uid)
        })
    );

    @Effect()
    authToken = this.actions$.pipe(
        ofType(AuthActions.SIGNIN),
        switchMap( () => { 
            return from(this.firebaseAuth.auth.currentUser.getIdToken()) 
        }),
        map(token => new AuthActions.SetToken(token))
    )

    @Effect()
    authSignup = this.actions$.pipe( 
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignIn) => action.payload),
        switchMap((authData : {email: string, password: string}) => {
            return from(this.firebaseAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password));
        }),
        map( cred => new AuthActions.Signin(cred.user.uid))
    );

    @Effect({dispatch: false})
    authLogout = this.actions$.pipe( 
        ofType(AuthActions.LOGOUT),
        tap(() => this.router.navigate(['/']))
    );

    constructor(private actions$: Actions, 
        private firebaseAuth: AngularFireAuth,
        private router: Router){}

}