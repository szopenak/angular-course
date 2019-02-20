import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { RecipesModule } from './recipes/recipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';
import { DataStorageService } from './shared/data-storage.service';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

const config = {
  apiKey: "AIzaSyCeDRQ-Mzp5r2ObraDoJf-BqeHydkRH0W4",
  authDomain: "przepisowo.firebaseapp.com",
  databaseURL: "https://przepisowo.firebaseio.com",
  projectId: "przepisowo",
  storageBucket: "przepisowo.appspot.com",
  messagingSenderId: "319202021211"
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    RecipesModule, 
    SharedModule,
    ShoppingListModule,  
    AuthModule, 
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule
  ],
  providers: [ShoppingListService, 
    RecipeService, 
    AuthService, 
    AuthGuard, 
    DataStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
