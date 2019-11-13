import { IngredientItemComponent } from './recipe/add-recipe/ingredient-item/ingredient-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './common/material.module';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { MethodComponent } from './recipe/add-recipe/method/method.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RecipeMainComponent } from './recipe/recipe-main/recipe-main.component';
import { RecipeTagComponent } from './recipe/recipe-tag/recipe-tag.component';
import { RecipeCardComponent } from './recipe/recipe-card/recipe-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    MethodComponent,
    IngredientItemComponent,
    RecipeMainComponent,
    RecipeTagComponent,
    RecipeCardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
  entryComponents: [AddRecipeComponent]
})
export class AppModule { }
