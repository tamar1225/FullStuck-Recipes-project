import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit {
  public recipesList: Recipe[] = [];
  public filterdList!: Recipe[];
  public selectedName: string = "";
  public selectedTime: number | null = null;
  public selectedCategory: number | null = null;

  constructor(private _recipeService: RecipeService, private _router: Router) { }

  ngOnInit(): void {
    this._recipeService.get_recipes().subscribe({
      next: (res) => {
        this.recipesList = res;
        this.filterdList = this.recipesList;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  navigateToAdd() {
    this._router.navigate(["recipes/add"]);
  }

  search() {
    this.filterdList = this.recipesList.filter((recipe) => {
      return (
        (!this.selectedName || recipe.recipeName.toLowerCase().includes(this.selectedName.toLowerCase())) &&
        (this.selectedCategory === null || recipe.categoryCode === Number(this.selectedCategory)) &&
        (this.selectedTime === null || recipe.preparation <= this.selectedTime)
      );
    });
  }

  cancelSearch() {
    this.filterdList = this.recipesList;
    this.selectedCategory = null;
    this.selectedName = "";
    this.selectedTime = null;
  }
}
