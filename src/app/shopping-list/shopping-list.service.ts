import {EventEmitter} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

    ingredients: Ingredient[] = [new Ingredient("Eggs", 4)];
    eventEmitter = new EventEmitter<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ing : Ingredient) {
        this.ingredients.push(ing);
        this.eventEmitter.emit(this.getIngredients());
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = this.ingredients.concat(ings);
        this.eventEmitter.emit(this.getIngredients());
    }

}