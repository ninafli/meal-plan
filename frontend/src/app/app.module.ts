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
import { RecipeSidebarComponent } from './recipe/recipe-sidebar.component';
import { RecipeCardComponent } from './recipe/view-recipe/recipe-card.component';
import { RecipeDetailsComponent } from './recipe/view-recipe/recipe-details.component';
import { ConfirmDialogComponent } from './common/confirm-dialog/confirm-dialog.component';
import { CommonComponent } from './common.component';
import { RecipeCardsComponent } from './recipe/view-recipe/recipe-cards.component';
import { WeeklyMenuMainComponent } from './weekly-menu/weekly-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipeEditorComponent,
    MethodComponent,
    IngredientItemComponent,
    RecipeMainComponent,
    RecipeTagComponent,
    ImageUrlDialog,
    RecipeSidebarComponent,
    RecipeCardComponent,
    RecipeDetailsComponent,
    FractionPipe,
    ConfirmDialogComponent,
    CommonComponent,
    RecipeCardsComponent,
    WeeklyMenuMainComponent
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
