import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";
import { AppState } from "../store/app.reducers";
import { Store } from "@ngrx/store";
import { Signin, SetToken, Logout } from "./store/auth.actions";

@Injectable()
export class AuthService {

    constructor(
        private router: Router, 
        private firebaseAuth: AngularFireAuth,
        private store: Store<AppState>) {
    }

    signUpUser(email: string, password: string) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(response =>{
            this.store.dispatch(new Signin(response.user.uid));
            this.firebaseAuth.auth.currentUser.getIdToken()
                .then( token => 
                    this.store.dispatch(new SetToken(token))
                );
            this.router.navigate(['/']);
        })
        .catch( error => {
          console.log(error);
        })
    }

    signInUser(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.store.dispatch(new Signin(response.user.uid));
            this.firebaseAuth.auth.currentUser.getIdToken()
            .then( token => 
                this.store.dispatch(new SetToken(token))
            );
            this.router.navigate(['/']);
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    logOut(){
        this.firebaseAuth.auth.signOut();
        this.store.dispatch(new Logout());
    }
}