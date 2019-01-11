import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, FormControlName, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: string;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataSource: DataStorageService) { }

  recipeForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    })
  }

  private initForm() {
    let recipeName='';
    let ingredients = new FormArray([]);
    let steps = new FormArray([]);
    let time = 0;

    if (this.editMode) {
      
      this.recipeService.getRecipe(''+this.id).subscribe(recipe => {
        let r : Recipe = recipe;
        recipeName = r.name;
        time = r.time;
      if (r['ingredients']){
        for(let ing of r.ingredients){
          ingredients.push(
            new FormControl(ing, Validators.required)
          );
        }
      }

      if (r['steps']){
        for(let s of r.steps){
          steps.push(
            new FormControl(s, Validators.required)
          );
        }
      }

      this.recipeForm = new FormGroup({
        'name' : new FormControl(recipeName, Validators.required),
        'ingredients': ingredients,
        'time' : new FormControl(time, Validators.required),
        'steps' : steps
      });
      }
      );
      
    }
      this.recipeForm = new FormGroup({
        'name' : new FormControl(recipeName, Validators.required),
        'ingredients': ingredients,
        'time' : new FormControl(time, Validators.required),
        'steps' : steps
      });
    
  }

  onSubmit(){
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(["recipes"]);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  getStepControls(){
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormControl(null, Validators.required)
    )
  }

  onAddStep(){
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormControl(null, Validators.required)
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    this.recipeForm.markAsDirty();
  }

  onDeleteStep(index: number) {
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
    this.recipeForm.markAsDirty();
  }

  onCancel(){
    this.recipeForm.reset();
    this.id = null;
    this.router.navigate(["recipes"]);
    this.editMode = null;
  }
}
