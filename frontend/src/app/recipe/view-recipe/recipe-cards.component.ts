import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-cards',
  templateUrl: './recipe-cards.component.html',
  styleUrls: ['./recipe-cards.component.css']
})
export class RecipeCardsComponent implements OnInit {
  recipes: Recipe[];
  constructor(private recipeService: RecipeService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe(queryParams => {
      this.queryParamChanged(queryParams);
    });
  }
  queryParamChanged(queryParams) {
    this.recipeService.find(queryParams.tag).subscribe(data => this.recipes = data);
  }
}
