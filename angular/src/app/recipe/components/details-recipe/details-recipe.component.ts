import { Component } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../category.service';
import { Category } from '../../../models/category.model';
import { error } from 'console';
import { User } from '../../../models/user.model';
import { UserService } from '../../../user.service';

@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.scss'
})
export class DetailsRecipeComponent implements OnInit {
  public recipe!: Recipe
  public iconHref!: string
  public isAuthor: boolean = false
  public recipeAuthor!: User
  public isEdit: boolean = false

  constructor(private _router: Router, private _route: ActivatedRoute, private _recipeService: RecipeService, private _categoryService: CategoryService, private _userService: UserService) { }

  ngOnInit(): void {
    const currentUserString = sessionStorage.getItem("currentUser");
    this._route.params.subscribe((params) => {
      this._recipeService.get_recipe_by_id(params['recipeCode']).subscribe({
        next: (res) => {
          this.recipe = res
          if (currentUserString) {
            const currentUser = JSON.parse(currentUserString);
            if (currentUser.code === this.recipe.userCode) {
              this.isAuthor = true
            }
          }
          this._categoryService.get_category_by_id(this.recipe.categoryCode).subscribe({
            next: (res) => {
              this.iconHref = res.url
            },
            error: (error) => {
              this.iconHref = "null"
            }
          })

          console.log(this.recipe.userCode)
          this._userService.get_user_by_id(this.recipe.userCode).subscribe({
            next: (res) => {
              this.recipeAuthor = res
            }
            ,
            error: (error) => {
              console.log(error)
            }
          })
        },
        error: (err) => {
          // this._router.navigate(notfo)
          console.error(err)
        }
      })

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

  deleteRecipe() {
    this._recipeService.delete_recipe(this.recipe.recipeCode).subscribe({
      next: (res) => {
        alert("recipe was deleted successfully")
        this._router.navigate(["recipes/all"])
      },
      error: (err) => {
        alert(err)
      }

    })
  }
}
