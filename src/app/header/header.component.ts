import {Component, EventEmitter, Output} from '@angular/core'
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {  
    constructor(private authService: AuthService, private router: Router) {}

    onLogOut(){
        this.authService.logOut();
        this.router.navigate(['/']);
    }
}