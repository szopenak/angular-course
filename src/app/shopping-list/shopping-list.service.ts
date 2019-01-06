import {EventEmitter} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredients: Ingredient[] = [new Ingredient("Eggs", 4)];
    eventEmitter = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ing : Ingredient) {
        this.ingredients.push(ing);
        this.eventEmitter.next(this.getIngredients());
    }

    addIngredients(ings: Ingredient[]) {
        this.ingredients = this.ingredients.concat(ings);
        this.eventEmitter.next(this.getIngredients());
    }

}