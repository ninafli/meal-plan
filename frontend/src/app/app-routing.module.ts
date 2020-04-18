import { WeeklyMenuComponent } from './weekly-menu/weekly-menu.component';
import { RecipeSideMenuComponent } from './recipe/recipe-side-menu.component';
import { RecipeMainComponent } from './recipe/recipe-main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeDetailsComponent } from './recipe/view-recipe/recipe-details.component';
import { WeeklyMenuSidebarComponent } from './weekly-menu/weekly-menu-sidebar/weekly-menu-sidebar.component';
import { AppComponent } from './app.component';
import { CommonComponent } from './common.component';

const routes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: CommonComponent, children: [
      { path: '', component: RecipeMainComponent },
      { path: '', outlet: 'sidemenu', component: RecipeSideMenuComponent },
      { path: ':id', component: RecipeDetailsComponent }]
  },
  {
    path: 'weekly-menu', component: CommonComponent, children: [
      {
        path: '',
        component: WeeklyMenuComponent
      },
      { path: '', outlet: 'sidemenu', component: WeeklyMenuSidebarComponent },
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
