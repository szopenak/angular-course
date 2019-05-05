import { HomeComponent } from './core/home/home.component';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { NgModule, Component } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
    {path : '', component: HomeComponent },
    {path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule'},
    {path : 'shopping-list', component: ShoppingListComponent },
    {path: "**", component: PageNotFoundComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]})

export class AppRoutingModule {
}