import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import {RecipeService } from './recipe.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  selectedRecipe: Recipe = null;

  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  onRecipeClicked(recipe: Recipe) {
    this.selectedRecipe = recipe;
  }
}
