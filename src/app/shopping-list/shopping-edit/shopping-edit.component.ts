import { Store } from '@ngrx/store';
import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as ShoppingListActions from './../store/shopping-list.actions';
import * as fromShoppingList from './../store/shopping-list.reducers';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromShoppingList.AppState>) { }
  sub: Subscription;
  editMode = false;
  editedItem: Ingredient;

  @ViewChild('f')
  shoppingListForm: NgForm;

  ngOnInit() {
    this.store.select('shoppingList')
      .subscribe(data => {
        if (data.editedIngredientIndex > -1){
          this.editMode = true;
          this.editedItem = data.editedIngredient;
          this.shoppingListForm.setValue({name: this.editedItem.name})
        } else {
          this.editMode = false;
        }
      });
  }

  onAddItem(form: NgForm) {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(form.value.name)));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(form.value.name)))
    }
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
    this.editedItem = null;
  }

  onDelete(){
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
