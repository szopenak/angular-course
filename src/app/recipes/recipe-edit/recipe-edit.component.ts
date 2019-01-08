import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Identifiers } from '@angular/compiler';
import { FormGroup, FormControl } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  recipeForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName='';
    let description='';
    let imagePath='';

    if (this.editMode) {
      const r : Recipe = this.recipeService.getRecipe(''+this.id);
      recipeName = r.name;
      description = r.description;
      imagePath = r.imageUrl;
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName),
      'description' : new FormControl(description),
      'imagePath' : new FormControl(imagePath)
    });
  }
}
