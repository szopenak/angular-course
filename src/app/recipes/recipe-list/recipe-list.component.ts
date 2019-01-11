import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: any[];
  constructor(private recipeService: RecipeService, private authService: AuthService, private dataSource: DataStorageService) {}
  sub: Subscription;

  ngOnInit() {
      this.sub = this.recipeService.recipesSubject.subscribe((recipes)=> {
        this.recipes = recipes;
        console.log(recipes);
      })
      this.recipes = this.recipeService.getRecipes();
  }

  getKey(row: any){
    return Object.keys(row)[0];
  }
  getRecipe(row: any) {
    return Object.values(row)[0];
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
