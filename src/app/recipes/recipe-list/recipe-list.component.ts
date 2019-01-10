import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[];
  constructor(private recipeService: RecipeService) {}
  sub: Subscription;

  ngOnInit() {
      this.recipes = this.recipeService.getRecipies();
      this.sub = this.recipeService.recipesSubject.subscribe((recipes)=> {
        this.recipes = recipes;
      })
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}
