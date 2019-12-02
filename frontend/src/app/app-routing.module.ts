import { RecipeSideMenuComponent } from './recipe/recipe-side-menu.component';
import { RecipeCardsComponent } from './recipe/view-recipe/recipe-cards/recipe-cards.component';
import { RecipeCardComponent } from './recipe/view-recipe/recipe-card/recipe-card.component';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { AddRecipeComponent } from './recipe/add-recipe/add-recipe.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'add-recipe', component: AddRecipeComponent },
  {
    path: 'recipes', component: RecipeMainComponent, children: [
      {
        path: '',
        component: RecipeCardsComponent
      },
      {
        path: '',
        outlet: 'sidemenu',
        component: RecipeSideMenuComponent
      }
    ]
  },
  { path: 'recipe/:id', component: ViewRecipeComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
