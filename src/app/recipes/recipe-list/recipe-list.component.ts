import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: any[];
  constructor(private recipeService: RecipeService, private authService: AuthService, private route: ActivatedRoute) {}
  sub: Subscription;
  mySub: Subscription;
  isMine: boolean = false;

  ngOnInit() {

      this.route.queryParams.subscribe((queryParams:any) => {
        this.isMine = queryParams.mine ? true : false;
        if (this.isMine && this.authService.isAuthenticated()) {
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
