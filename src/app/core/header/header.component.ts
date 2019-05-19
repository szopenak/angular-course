import {Component, EventEmitter, Output, OnInit} from '@angular/core'
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Observable } from 'rxjs';
import * as fromAuth from 'src/app/auth/store/auth.reducers';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{  
    constructor(
        private authService: AuthService, 
        private router: Router,
        private store: Store<AppState>    
    ) {}
    
    isAuthenticated: Observable<fromAuth.State>;

    onLogOut(){
        this.authService.logOut();
        this.router.navigate(['/']);
    }

    ngOnInit(){
        this.isAuthenticated = this.store.select('auth');
    }
}