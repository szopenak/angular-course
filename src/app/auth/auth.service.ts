import { Injectable } from "@angular/core";
import * as firebase from "firebase"
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

    constructor(private router: Router) {
    }

    token: string;

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch( error => {
          console.log(error);
        })
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken()
            .then( token => this.token = token)
        })
        .catch(error => {
            console.log(error);
        })
        
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
            .then( token => this.token = token);
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }

    logOut(){
        firebase.auth().signOut();
        this.token = null;
    }

}