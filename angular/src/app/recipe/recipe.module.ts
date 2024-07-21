import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsRecipeComponent } from './components/details-recipe/details-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './components/small-recipe/small-recipe.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeRoutingModule } from './recipe.routing.module';
import { Recipe } from '../models/recipe.model';
import { RecipeService as _recipeService}  from '../recipe.service';
import { FormGroupName, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgForm,NgModel } from '@angular/forms';
import {TimePipe} from '../time.pipe'
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {
  IgxButtonModule,
  IgxCardModule,
  IgcFormsModule,
  IgxIconModule
} from "igniteui-angular";

// import {
//   IgxButtonModule,
//   IgxCardModule,
//   IgcFormsModule,
//   IgxIconModule
// } from "igniteui-angular";


@NgModule({
  bootstrap: [SmallRecipeComponent],
  declarations: [AllRecipesComponent, DetailsRecipeComponent, EditRecipeComponent, SmallRecipeComponent, AddRecipeComponent],
  imports: [
    CommonModule, RecipeRoutingModule,
    FormsModule,
    IgxButtonModule,
    IgxCardModule,
    IgcFormsModule,
    IgxIconModule,
    ReactiveFormsModule,
    TimePipe,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [Recipe, _recipeService]
})
export class RecipeModule { }
