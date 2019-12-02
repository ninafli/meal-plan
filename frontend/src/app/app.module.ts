import { IngredientItemComponent } from './recipe/add-recipe/ingredient-item/ingredient-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './common/material.module';
import { AddRecipeComponent, ImageUrlDialog } from './recipe/add-recipe/add-recipe.component';
import { MethodComponent } from './recipe/add-recipe/method/method.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { RecipeTagComponent } from './recipe/add-recipe/recipe-tag/recipe-tag.component';
import { RecipeCardComponent } from './recipe/view-recipe/recipe-card/recipe-card.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { RecipeSideMenuComponent } from './recipe/recipe-side-menu.component';
import { RecipeCardsComponent } from './recipe/view-recipe/recipe-cards/recipe-cards.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    MethodComponent,
    IngredientItemComponent,
    RecipeMainComponent,
    RecipeTagComponent,
    RecipeCardComponent,
    ImageUrlDialog,
    ViewRecipeComponent,
    RecipeSideMenuComponent,
    RecipeCardsComponent
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
  entryComponents: [AddRecipeComponent, ImageUrlDialog]
})
export class AppModule { }
