import { Store } from '@ngrx/store';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {

    constructor(private dataStorage: DataStorageService){
        dataStorage.getRecipes().snapshotChanges().subscribe(recipes => {
            let rs = [];
            recipes.forEach(r => {
                let id =  r.payload.doc.id;
                rs.push({[id] : r.payload.doc.data()});
            });
            this.recipes = rs;
            for(let r of this.recipes){
               console.log(r);
            }
            this.recipesSubject.next(rs);
        });
    }
    recipes: any[];
    recipesSubject = new Subject<any[]>();

    myRecipes: any[];
    myRecipesSubject = new Subject<any[]>();

    getRecipes(){
        return this.recipes;
    }

    getMyRecipes(){
        this.dataStorage.getMyRecipes().subscribe(recipes => {
            let rs = [];
            recipes.forEach(r => {
                let id =  r.payload.doc.id;
                rs.push({[id] : r.payload.doc.data()});
            });
            this.myRecipes = rs;
            for(let r of this.myRecipes){
               console.log('My recipe:')
               console.log(r);
            }
            this.myRecipesSubject.next(rs);
        });
        return this.myRecipesSubject;
    }

    getRecipe(id: string): Observable<Recipe> {
        return this.dataStorage.getRecipe(id);
    }
    
    addRecipe(recipe: Recipe) {
        this.dataStorage.postRecipe(recipe);
    }

    updateRecipe(index: string, recipe:Recipe) {
        this.dataStorage.updateRecipe(index, recipe);
    }

    deleteRecipe(index: string) {
        this.dataStorage.deleteRecipe(index);
    }
}