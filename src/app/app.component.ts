import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  config = {
    apiKey: "",
    authDomain: "przepisowo.firebaseapp.com",
    databaseURL: "https://przepisowo.firebaseio.com",
    projectId: "przepisowo",
    storageBucket: "przepisowo.appspot.com",
    messagingSenderId: "319202021211"
  };

  ngOnInit() {
    firebase.initializeApp(this.config);
  }
}
