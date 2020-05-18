import { WeeklyMenuMainComponent } from './weekly-menu/weekly-menu.component';
import { RecipeCardsComponent } from './recipe/view-recipe/recipe-cards.component';
import { RecipeSidebarComponent } from './recipe/recipe-sidebar.component';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe/view-recipe/recipe-details.component';
import { AppComponent } from './app.component';
import { CommonComponent } from './common.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipeMainComponent, children: [
      { path: '', component: RecipeCardsComponent },
      { path: '', outlet: 'sidemenu', component: RecipeSidebarComponent },
      { path: ':id', component: RecipeDetailsComponent }]
  },
  {
    path: 'weekly-menu', component: WeeklyMenuMainComponent, children: [
      // {
      //   path: '',
      //   component: WeeklyMenuComponent
      // },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
