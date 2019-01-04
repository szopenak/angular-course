import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();
    
    recipes: Recipe[] = [
        new Recipe("Pancakes", 
        "Tasty pankaces, great for a breakfast!", 
        "https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg",
    [new Ingredient('Water', 2), new Ingredient('Flour', 2)]),
        new Recipe("Pancakes 2", 
        "Tasty pankaces, great for a breakfast!", 
        "https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg",
    [new Ingredient('Meat', 2), new Ingredient('Meat', 2)])
      ];

      getRecipies() {
          return this.recipes.slice();
      }

      getRecipe(id: string) {
        return +id > this.recipes.length ? null : this.recipes[+id]; 
      }
}