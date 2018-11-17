import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../../recipe.model'

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;
  @Output('recipeClicked') recipeClickedEventEmitter = new EventEmitter<Recipe>();

  recipeClicked(){
    this.recipeClickedEventEmitter.emit(this.recipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
