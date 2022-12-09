//As we reload the page it will give error. we need to fetch the data first from database to see the recipes.So we can use guard (which is executed before a route loads or after a route loaded) 
//to fetch data before we load the details of recipe. But using another approach. using resolver (like as guard - executes before the route loads to ensure that the data we want is is present there)  

import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {      //Resolve is generic interface.
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();

    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();  //no need to subscribe the observable as resolver will take care if any data is changed.
    } else {
      return recipes;
    }
  }
}
