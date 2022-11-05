import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('French Fries', 'A Potato snack', 'https://media.istockphoto.com/photos/diverse-keto-dishes-picture-id1280158821?b=1&k=20&m=1280158821&s=170667a&w=0&h=ibwKxBzWcygq6NMKO5FTD-3ljLvwM8E1WVevw7XSmlk='),
    new Recipe('Burger', 'Bread snack', 'https://assets.cntraveller.in/photos/60ba26c0bfe773a828a47146/4:3/w_1440,h_1080,c_limit/Burgers-Mumbai-Delivery.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
