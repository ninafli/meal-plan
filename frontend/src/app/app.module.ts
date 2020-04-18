import { FractionPipe } from './common/fraction.pipe';
import { IngredientItemComponent } from './recipe/ingredient-item/ingredient-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MaterialModule } from './common/material.module';
import { RecipeEditorComponent, ImageUrlDialog } from './recipe/recipe-editor/recipe-editor.component';
import { MethodComponent } from './recipe/method/method.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipe/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { RecipeTagComponent } from './recipe/recipe-tag/recipe-tag.component';
import { RecipeSideMenuComponent } from './recipe/recipe-side-menu.component';
import { RecipeCardComponent } from './recipe/view-recipe/recipe-card.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { WeeklyMenuComponent } from './weekly-menu/weekly-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeEditorComponent,
    MethodComponent,
    IngredientItemComponent,
    RecipeMainComponent,
    RecipeTagComponent,
    ImageUrlDialog,
    RecipeSideMenuComponent,
    RecipeCardComponent,
    ViewRecipeComponent,
    FractionPipe,
    ConfirmDialogComponent,
    WeeklyMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  exports: [FractionPipe],
  providers: [RecipeService, FractionPipe],
  bootstrap: [AppComponent],
  entryComponents: [RecipeEditorComponent, ImageUrlDialog, ConfirmDialogComponent]
})
export class AppModule { }
