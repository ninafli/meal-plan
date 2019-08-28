import { IngredientItemComponent } from './recipe/add-recipe/ingredient-item/ingredient-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './common/material.module';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { DirectionComponent } from './recipe/add-recipe/direction/direction.component';
import { FormsModule } from '@angular/forms';

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
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AddRecipeComponent]
})
export class AppModule { }
