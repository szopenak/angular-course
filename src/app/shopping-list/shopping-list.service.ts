import {EventEmitter} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {

    ingredients: Ingredient[] = [];
    eventEmitter = new Subject<Ingredient[]>();

    startedEditing: Subject<number> = new Subject();

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

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    editIngredient(index:number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        console.log(ingredient);
        this.eventEmitter.next(this.getIngredients().slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.eventEmitter.next(this.getIngredients().slice());
    }

}