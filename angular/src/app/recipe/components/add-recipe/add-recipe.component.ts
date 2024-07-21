import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  categories!: Category[];
  recipeForm: FormGroup;

  constructor(private _router: Router, private _recipeService: RecipeService, private fb: FormBuilder, private _categoryService: CategoryService) {
    this.recipeForm = this.fb.group({
      recipeName: ['', [Validators.minLength(3), Validators.required]],
      categoryCode: ['', [Validators.required]],
      preparation: ['', [Validators.required]],
      difficulty: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      ingredients: this.fb.array([], Validators.minLength(2)),
      instructions: this.fb.array([], Validators.minLength(2)),
      image: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.addIngredient()
    this.addInstruction()
    this._categoryService.get_categorys().subscribe({
      next: (res) => { this.categories = res },
      error: (err) => this.categories = []
    })
  }
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }
  checkIngredient(i: number) {
    if (this.ingredients.at(i).get('ingredient')?.value == '' && i < this.ingredients.length - 1) {
      this.removeIngredient(i)
    }
    else if (this.ingredients.at(i).get('ingredient')?.value != '' && i == this.ingredients.length - 1) {
      this.addIngredient()
    }
  }
  checkInstructions(i: number) {
    if (this.instructions.at(i).get('instruction')?.value == '' && i < this.instructions.length - 1) {
      this.removeInstruction(i)
    }
    else if (this.instructions.at(i).get('instruction')?.value != '' && i == this.instructions.length - 1) {
      this.addInstruction()
    }
  }

  newFormControl(field: string): FormGroup {
    const group: { [key: string]: any } = {};
    group[field] = [''];
    return this.fb.group(group);
  }
  addIngredient() {
    this.ingredients.push(this.newFormControl("ingredient"));
  }
  addInstruction() {
    this.instructions.push(this.newFormControl("instruction"));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
  removeInstruction(i: number) {
    this.instructions.removeAt(i);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      let recipe: Recipe = this.recipeForm.value;
      recipe.ingredients = this.ingredients.controls.slice(0, -1).map(control => control.value.ingredient);
      recipe.instructions = this.instructions.controls.slice(0, -1).map(control => control.value.instruction)
      recipe.dateAdded = new Date()
      const currentUserString = sessionStorage.getItem("currentUser");
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        recipe.userCode = currentUser.code;
      }
      else {
        console.error('currentUser is null or undefined');
        alert("Only registered users are allowed to add recipes")
        this._router.navigate(["login"]);
        return
      }
      this._recipeService.post_recipe(recipe).subscribe({
        next: (res) => {
          Swal.fire(
            'Good job!',
            'Recipe added successfully!',
            'success'
          ).then(() => {
            this._router.navigate(['recipes/all'])
          });
        },
        error(err) {
          Swal.fire(
            'Oops!',
            err.value,
            'error'
          );        }
      });
    } else { 
      Object.keys(this.recipeForm.controls).forEach(key => {
        const controlErrors = this.recipeForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error('Form control:', key, 'has error:', keyError);
          });
        }
      });
    }
  }
}

