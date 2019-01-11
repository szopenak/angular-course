import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "../auth/auth.service";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore'
import { Recipe } from "../recipes/recipe.model";
import { Observable } from "rxjs";

@Injectable()
export class DataStorageService{

    recipesCollection: AngularFirestoreCollection<Recipe>;
    recipes: Observable<Recipe[]>;

    constructor(private http: HttpClient, private authService: AuthService, private afs: AngularFirestore){
        this.recipesCollection = this.afs.collection('recipes');
        this.recipes = this.recipesCollection.valueChanges();    
    }

    getRecipe(index: string) : Observable<Recipe> {
        return new Observable((observer) => {
            this.recipesCollection.ref.doc(index)
            .get()
            .then( recipe => {
                let fetched = recipe.data()
                observer.next(new Recipe(fetched.name, fetched.description, 
                    fetched.photoUrl, fetched.ingredients, 
                    fetched.steps, fetched.time,fetched.uid)
                );
            });
        });
    }
}