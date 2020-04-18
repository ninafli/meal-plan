import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';
import { RecipeService } from './recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-main',
  templateUrl: './recipe-main.component.html',
  styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit {

  recipes: Recipe[];
  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(queryParams => {
      console.log('changed');
      this.queryParamChanged(queryParams);
    });
  }
  queryParamChanged(queryParams) {
    this.recipeService.find(queryParams.tag).subscribe(data => this.recipes = data);
  }
}
