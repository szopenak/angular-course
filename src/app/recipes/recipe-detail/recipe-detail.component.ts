import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { AuthService } from 'src/app/auth/auth.service';
import { auth } from 'firebase';
import { Ingredient } from 'src/app/shared/ingredient.model';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private shoppingListService : ShoppingListService,
    private route: ActivatedRoute,
    private recipeService : RecipeService,
    private router: Router,
    private authService: AuthService) { }

  recipe: Recipe;
  id: string;

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.recipeService.getRecipe(this.id).subscribe(recipe => {
          this.recipe = recipe;
        });
      }
    );
  }
  
  addToShoppingList() {
    console.log("Adding to shopping list: "+this.recipe.ingredients);
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onRecipeDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["../"], {relativeTo: this.route});
  }

  canDelete() {
    return this.authService.isAuthenticated() && (this.authService.getUid() == this.recipe.uid);
  }

  canEdit() {
    return this.authService.isAuthenticated() && (this.authService.getUid() == this.recipe.uid);
  }
}
