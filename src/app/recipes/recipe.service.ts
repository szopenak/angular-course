import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class RecipeService {

    recipesSubject = new Subject<Recipe[]>()
    
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

      getRecipe(id: string) : Recipe {
        return +id > this.recipes.length ? null : this.recipes[+id]; 
      }
    
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesSubject.next(this.getRecipies());
    }

    updateRecipe(index: string, recipe:Recipe) {
        this.recipes[+index] = recipe;
        this.recipesSubject.next(this.getRecipies());
    }

    deleteRecipe(index: string) {
        this.recipes.splice(+index, 1);
        this.recipesSubject.next(this.getRecipies());
    }
}