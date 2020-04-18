import { WeeklyMenuComponent } from './weekly-menu/weekly-menu.component';
import { RecipeSideMenuComponent } from './recipe/recipe-side-menu.component';
import { RecipeCardComponent } from './recipe/view-recipe/recipe-card.component';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { RecipeEditorComponent } from './recipe/recipe-editor/recipe-editor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewRecipeComponent } from './recipe/view-recipe/view-recipe.component';

const routes: Routes = [
  { path: 'add-recipe', component: RecipeEditorComponent },
  { path: '', outlet: 'sidemenu', component: RecipeSideMenuComponent },
  {
    path: 'recipes', component: RecipeMainComponent, children: [
      {
        path: ':id',
        component: ViewRecipeComponent
      },
    ]
  },
  {
    path: 'weekly-menu', component: WeeklyMenuComponent, children: [
      {
        path: '',
        component: WeeklyMenuComponent
      },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
