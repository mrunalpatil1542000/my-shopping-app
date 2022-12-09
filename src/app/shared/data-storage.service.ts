import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })                                    //as we are injecting HttpClient and RecipeService
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(                                                                 //as we want to overwrite on previous data so used put
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json',  //post is used if we want to pass single data item.
        recipes                                                             //put is used to pass multiple data item
      )                                                                     //if we use post then cryptic key is generated in firebase. for put not generated as we know data already as previous data is there.
      .subscribe(response => {                                              //getting http response in response when we subscribe.
        console.log(response);
      });
  }
                                                                            //we need to subscribe the result of get and put method (observable) where we want the result. 
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(                                                       //specifying the exact type of response we get response as object
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {                                                    //map() rxjs operator - used to transform the items emitted by an Observable by applying a function to each item.
          return recipes.map(recipe => {                                    //map() function - creates an array by calling a specific function on each element present in the parent array
            return {
              ...recipe,                                                    //spread operator
              ingredients: recipe.ingredients ? recipe.ingredients : []     //if ingredient is not present for any recipe then assign it as empty array
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);                          //setting the recipes that we got in response to the recipes array in recipe service
        })
      )
  }
}
