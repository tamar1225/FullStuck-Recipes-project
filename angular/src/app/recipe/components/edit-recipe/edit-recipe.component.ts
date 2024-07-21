import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { UserService } from '../../../user.service';
import { Recipe } from '../../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent {
  @Input() public recipe!: Recipe
  public updatedRecipe!: Recipe
  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>()

  constructor(private _recipeService: RecipeService) { }

  ngOnInit(): void {
    this.updatedRecipe = { ...this.recipe }
  }

 trackByIndex(index:number):any{
    return index;
  }
  
  updateRecipe() {
    this._recipeService.put_recipe(this.updatedRecipe).subscribe({
      next: (res) => {
        console.log("updated successfully")
        this.recipe.difficulty=res.difficulty;
        this.recipe.image=res.image;
        this.recipe.ingredients=res.ingredients;
        this.recipe.instructions=res.instructions;
        this.recipe.recipeName=res.recipeName;
        // this.recipe = { ...res }
      },
      error: (err) => {
        console.log("update failed")
      }
    })
    this.onEdit.emit(false)
  }
  cancel() {
    this.onEdit.emit(false)
  }

}
