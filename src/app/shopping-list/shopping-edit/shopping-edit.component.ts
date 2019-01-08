import { Component, OnInit, EventEmitter, Output, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private shoppingListService: ShoppingListService) { }
  sub: Subscription;
  editMode = false;
  editedItemIndex: number;

  @ViewChild('f')
  shoppingListForm: NgForm;

  ngOnInit() {
    this.sub = this.shoppingListService.startedEditing.subscribe((index: number)=> {
        this.editMode = true;
        this.editedItemIndex = index;
        const editedItem : Ingredient = this.shoppingListService.getIngredient(index);
        this.shoppingListForm.setValue({
          name: editedItem.name,
          amount: editedItem.amount
        });
    })
  }

  onAddItem(form: NgForm) {
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedItemIndex, new Ingredient(form.value.name, parseInt(form.value.amount)));
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(new Ingredient(form.value.name, parseInt(form.value.amount)));
    }
    form.reset();
  }

  onClear(){
    this.shoppingListForm.reset();
    this.editMode = false;
    this.editedItemIndex = null;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
