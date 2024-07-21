import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.scss'
})
export class SmallRecipeComponent implements OnInit {

  constructor(private _router: Router, private _categoryService: CategoryService) { }

  @Input()
  public recipe!: Recipe
  public category!: Category

  ngOnInit(): void {
    this._categoryService.get_category_by_id(this.recipe.categoryCode).subscribe({
      next: (res) => {
        this.category = res
      }
    })
  }

  getStarRating(difficulty: number): string {
    let stars = '';
    const fullStar = '⭐';
    const emptyStar = '☆';
    for (let i = 0; i < difficulty; i++) {
      stars += fullStar;
    }
    for (let i = difficulty; i < 5; i++) {
      stars += emptyStar;
    }
    return stars;
  }

  public navigeteToDetails() {
    if (!sessionStorage.getItem("currentUser")) {
      const move = confirm("you didn't log in yet, to see more details first log in")
      if (move) {
        this._router.navigate(["login/"])
      }
    }
    else this._router.navigate(["recipes/details", this.recipe.recipeCode])
  }

  model: any;

}
