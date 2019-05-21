import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { StoreModule } from '@ngrx/store';
import { shoppingListReducer } from './shopping-list/store/shopping-list.reducers';
import { authReducer } from './auth/store/auth.reducers';
import { AuthEffects } from './auth/store/auth.effects';

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    ShoppingListModule,
    AuthModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    StoreModule.forRoot({
      shoppingList : shoppingListReducer,
      auth: authReducer
    }),
    EffectsModule.forRoot([AuthEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
