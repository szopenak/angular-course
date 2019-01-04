import {Routes, RouterModule} from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipesComponent } from './recipes/recipes.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';

const appRoutes: Routes = [
    {path : '', redirectTo: '/recipes', pathMatch: 'full'},
    {path : 'recipes', component: RecipesComponent, children : [
        {path: '', component: RecipeStartComponent},
        {path: ':id', component: RecipeDetailComponent}
    ]},
    {path : 'shopping-list', component: ShoppingListComponent },
    {path: "**", component: PageNotFoundComponent}
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]})

export class AppRoutingModule {
}