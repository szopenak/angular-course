import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: any[];
  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private store: Store<AppState>
    ) {}
  sub: Subscription;
  mySub: Subscription;
  isMine: boolean = false;
  authenticated: boolean;

  ngOnInit() {
      this.store.select('auth').subscribe(auth => this.authenticated = auth.authenticated);
      this.route.queryParams.subscribe((queryParams:any) => {
        this.isMine = queryParams.mine ? true : false;
        if (this.isMine && this.authenticated) {
          this.recipes = this.recipeService.myRecipes;
          if(this.sub){
            this.sub.unsubscribe();
          }
          this.mySub = this.recipeService.getMyRecipes().subscribe((recipes)=> {
            this.recipes = recipes;
            console.log(recipes);
          })
        } else {
          this.sub = this.recipeService.recipesSubject.subscribe((recipes)=> {
            this.recipes = recipes;
            console.log(recipes);
          })
          if(this.mySub){
            this.mySub.unsubscribe();
          }
          this.recipes = this.recipeService.getRecipes();
        }
        console.log(this.isMine);
      })
  }

  getKey(row: any){
    return Object.keys(row)[0];
  }
  getRecipe(row: any) {
    return Object.values(row)[0];
  }

  ngOnDestroy(){
    if(this.sub){
      this.sub.unsubscribe();
    }
    if(this.mySub){
      this.mySub.unsubscribe();
    }
    console.log("destroy")
  }
}
