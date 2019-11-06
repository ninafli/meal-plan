import { RecipeService } from './../recipe.service';
import { Ingredient } from '../ingredient';
import { Component, OnInit, OnChanges, ViewChild } from '@angular/core';
import { IngredientItemComponent } from './ingredient-item/ingredient-item.component';
import { MethodComponent } from './method/method.component';
import { Recipe } from '../recipe';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatChipInputEvent, MatAutocomplete } from '@angular/material';

@Component({
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  ingredients: Ingredient[] = [];
  methods: string[] = [];
  recipeName = '';
  tags: Set<string>;

  @ViewChild('newIngredient', { static: false }) newIngredient: IngredientItemComponent;
  @ViewChild('newDirection', { static: false }) newDirection: MethodComponent;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.focusInput();
  }

  deleteIngredient(ingredient: Ingredient) {
    const index = this.ingredients.indexOf(ingredient);
    if (index > -1) {
      this.ingredients.splice(index, 1);
    }
  }

  addDirection(method: string) {
    this.methods.push(method);
    this.newDirection.focusInput();
  }

  isValid(): boolean {
    return this.methods.length > 0 && this.ingredients.length > 0 && this.recipeName !== '';
  }
  saveRecipe() {
    if (this.isValid()) {
      this.recipeService.save(new Recipe(this.ingredients, this.methods, this.tags, this.recipeName));
    }
  }
}
