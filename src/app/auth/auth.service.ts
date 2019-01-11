import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()
export class AuthService {

    constructor(private router: Router, private firebaseAuth: AngularFireAuth) {
    }

    token: string;
    uid: string;

    signUpUser(email: string, password: string) {
        this.firebaseAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(response =>{
            this.uid = response.user.uid;
            this.firebaseAuth.auth.currentUser.getIdToken()
            .then( token => this.token = token)
            this.router.navigate(['/']);
        })
        .catch( error => {
          console.log(error);
        })
    }

    signInUser(email: string, password: string) {
        this.firebaseAuth.auth.signInWithEmailAndPassword(email, password)
        .then(response => {
            this.uid = response.user.uid;
            this.firebaseAuth.auth.currentUser.getIdToken()
            .then( token => this.token = token)
            this.router.navigate(['/']);
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    getToken() {
        this.firebaseAuth.auth.currentUser.getIdToken()
            .then( token => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logOut(){
        this.firebaseAuth.auth.signOut();
        this.uid = null;
        this.token = null;
    }

    getUid():string{
        return this.uid;
    }

}