import { Injectable } from "@angular/core";
import * as firebase from "firebase"
export class AuthService {

    constructor() {
    }

    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch( error => {
          console.log(error);
        })
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        })
        
    }

}