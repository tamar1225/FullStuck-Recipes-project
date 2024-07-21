import { NgModule } from '@angular/core';
import { DetailsRecipeComponent } from './components/details-recipe/details-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './components/small-recipe/small-recipe.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const recipeRouts:Routes=[
{path: 'all', component: AllRecipesComponent},
{path: 'small', component: SmallRecipeComponent},
{path: 'details/:recipeCode', component: DetailsRecipeComponent},
{path: 'edit/:recipeCode', component: EditRecipeComponent},
{path: 'add', component: AddRecipeComponent},
{path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(recipeRouts)
  ] 
})
export class RecipeRoutingModule { }
