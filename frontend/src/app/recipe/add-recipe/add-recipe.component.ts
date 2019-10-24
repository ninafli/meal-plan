import { RecipeService } from './../recipe.service';
import { Ingredient } from '../ingredient';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { MethodComponent } from './method/method.component';
import { Recipe } from '../recipe';

@Component({
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  ingredients: Ingredient[] = [];
  methods: string[] = [];
  @ViewChild('newIngredient', { static: false }) newIngredient: IngredientItemComponent;
  @ViewChild('newDirection', { static: false }) newDirection: MethodComponent;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() { }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.focusInput();
  }

  addDirection(method: string) {
    this.methods.push(method);
    console.log(this.methods);
    this.newDirection.focusInput();
  }

  saveRecipe() {
    if (this.methods.length > 0 && this.ingredients.length > 0) {
      this.recipeService.save(new Recipe(this.ingredients, this.methods));
    }
  }
}
