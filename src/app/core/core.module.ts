import { DataStorageService } from './../shared/data-storage.service';
import { AuthGuard } from './../auth/auth-guard.service';
import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './../app-routing.module';
import { SharedModule } from './../shared/shared.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        PageNotFoundComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule
    ], 
    exports: [
        AppRoutingModule,
        HeaderComponent,
        PageNotFoundComponent
    ], providers: [
        RecipeService, 
        AuthService, 
        AuthGuard, 
        DataStorageService
    ]
})
export class CoreModule {}