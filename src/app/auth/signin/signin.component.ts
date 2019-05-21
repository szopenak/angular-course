import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from 'src/app/store/app.reducers';
import { Store } from '@ngrx/store';
import { TrySignIn } from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignIn(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;
    this.store.dispatch(new TrySignIn({email: email, password: password}));
  }

}