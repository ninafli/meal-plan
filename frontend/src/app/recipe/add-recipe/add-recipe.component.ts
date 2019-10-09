import { Direction } from './../direction';
import { RecipeService } from './../recipe.service';
import { Ingredient } from '../ingredient';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { DirectionComponent } from './direction/direction.component';
import { Recipe } from '../recipe';

@Component({
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  ingredients = new Map<number, Ingredient>();
  directions = new Map<number, Direction>();
  @ViewChild('newIngredient', { static: false }) newIngredient: IngredientItemComponent;
  @ViewChild('newDirection', { static: false }) newDirection: DirectionComponent;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() { }

  addIngredient(ingredient: Ingredient) {
    if (!ingredient.id) {
      ingredient.id = this.ingredients.size + 1;
    }

    this.ingredients.set(ingredient.id, ingredient);
    this.newIngredient.focusInput();
  }

  addDirection(direction: Direction) {
    if (!direction.id) {
      direction.id = this.directions.size + 1;
    }

    this.directions.set(direction.id, direction);
    this.newDirection.focusInput();
  }

  saveRecipe() {
    if (this.directions.size > 0 && this.ingredients.size > 0) {
      this.recipeService.save(new Recipe(Array.from(this.ingredients.values()), Array.from(this.directions.values())));
    }
  }
}
