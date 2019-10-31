import { RecipeMainComponent } from './recipe/recipe-main/recipe-main.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeComponent },
  { path: 'recipes', component: RecipeMainComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
