import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseURL="http://127.0.0.1:3000/Recipe"

  constructor(private _http:HttpClient) { }

  get_recipes():Observable<Recipe[]>{
    return this._http.get<Recipe[]>(this.baseURL)
  }

  get_recipe_by_id(code:number):Observable<Recipe>{
    return this._http.get<Recipe>(`${this.baseURL}/${code}`)
  }

  post_recipe(recipe: Recipe):Observable<Recipe>{
    return this._http.post<Recipe>(this.baseURL, recipe)
  }
  put_recipe(recipe: Recipe):Observable<Recipe>{
    return this._http.put<Recipe>(`${this.baseURL}/${recipe.recipeCode}`, recipe)
  }
  delete_recipe(id:Number):Observable<Recipe>{
    return this._http.delete<Recipe>(`${this.baseURL}/${id}`)
  }
}
