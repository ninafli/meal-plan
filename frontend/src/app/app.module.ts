import { IngredientItemComponent } from './recipe/add-recipe/ingredient-item/ingredient-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './common/material.module';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { DirectionComponent } from './recipe/add-recipe/direction/direction.component';
import { FormsModule } from '@angular/forms';
import { RecipeService } from './recipe/recipe.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AddRecipeComponent,
    DirectionComponent,
    IngredientItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [RecipeService],
  bootstrap: [AppComponent],
  entryComponents: [AddRecipeComponent]
})
export class AppModule { }
