import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore'
import { Recipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";

@Injectable()
export class DataStorageService{

    recipesCollection: AngularFirestoreCollection<Recipe>;
    recipes: Observable<DocumentChangeAction<Recipe>[]>

    constructor(private http: HttpClient, private authService: AuthService, private afs: AngularFirestore){
        this.recipesCollection = this.afs.collection('recipes');
        this.recipes = this.recipesCollection.snapshotChanges();    
    }

    getRecipes() {
        return this.recipesCollection;
    }

    getMyRecipes(){
        let uid = this.authService.getUid();
        return this.afs.collection('recipes', ref => ref.where('uid', '==', uid)).snapshotChanges();
    }

    getRecipe(index: string) : Observable<Recipe> {
        return new Observable((observer) => {
            this.recipesCollection.ref.doc(index)
            .get()
            .then( recipe => {
                let fetched = recipe.data()
                observer.next(new Recipe(fetched.name, fetched.ingredients, 
                    fetched.steps, fetched.time,fetched.uid)
                );
            });
        });
    }

    
postRecipe(recipe: Recipe){
      recipe.uid = this.authService.getUid();
      this.recipesCollection.add(recipe)
  }
  
  updateRecipe(id: string, recipe: Recipe){
      recipe.uid = this.authService.getUid();
      this.recipesCollection.doc(id).set(recipe) 
  }
  
  deleteRecipe(id: string) {
      this.recipesCollection.doc(id).delete();
  }
}