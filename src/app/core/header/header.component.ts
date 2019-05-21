import {Component, EventEmitter, Output, OnInit} from '@angular/core'
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Observable } from 'rxjs';
import * as fromAuth from 'src/app/auth/store/auth.reducers';
import { Logout } from 'src/app/auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{  
    constructor(
        private store: Store<AppState>    
    ) {}
    
    isAuthenticated: Observable<fromAuth.State>;

    onLogOut(){
        this.store.dispatch(new Logout());
    }

    ngOnInit(){
        this.isAuthenticated = this.store.select('auth');
    }
}