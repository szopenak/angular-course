import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore'
import { Recipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.reducers";

@Injectable()
export class DataStorageService{

    recipesCollection: AngularFirestoreCollection<Recipe>;
    recipes: Observable<DocumentChangeAction<Recipe>[]>
    uid: string;

    constructor(private http: HttpClient, 
        private afs: AngularFirestore, 
        private store: Store<AppState>
        ){
        this.recipesCollection = this.afs.collection('recipes');
        this.recipes = this.recipesCollection.snapshotChanges();
        this.store = store;
        this.store.select('auth').subscribe(auth => this.uid = auth.uid);
    }

    getRecipes() {
        return this.recipesCollection;
    }

    getMyRecipes(){
        return this.afs.collection('recipes', ref => ref.where('uid', '==', this.uid)).snapshotChanges();
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
      recipe.uid = this.uid;
      this.recipesCollection.add(recipe)
  }
  
  updateRecipe(id: string, recipe: Recipe){
      recipe.uid = this.uid;
      this.recipesCollection.doc(id).set(recipe) 
  }
  
  deleteRecipe(id: string) {
      this.recipesCollection.doc(id).delete();
  }
}