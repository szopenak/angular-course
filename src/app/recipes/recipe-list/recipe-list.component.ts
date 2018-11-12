import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Recipe[] = [
    new Recipe("Pancakes", 
    "Tasty pankaces, great for a breakfast!", 
    "https://static01.nyt.com/images/2017/03/24/dining/24COOKING-CLASSICPANCAKES/24COOKING-CLASSICPANCAKES-articleLarge.jpg")
  ];

  constructor() { }

  ngOnInit() {
  }

}