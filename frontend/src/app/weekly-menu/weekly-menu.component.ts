import { RecipeService } from './../recipe/recipe.service';
import { WeeklyMenuService } from './weekly-menu.service';
import { Component, OnInit, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { WeeklyMenu } from './weekly-menu';
import { Recipe } from '../recipe/recipe';
import { Ingredient } from '../recipe/ingredient';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.css']
})
export class WeeklyMenuMainComponent implements AfterContentInit {

  public menu?: WeeklyMenu;
  public searchString: string;
  public searchResult: Recipe[];
  public searchResultSummary: string;
  constructor(private recipeService: RecipeService, private weeklyMenuService: WeeklyMenuService) {
  }

  ngAfterContentInit() {
    this.weeklyMenuService.get().subscribe(data => {
      this.menu = new WeeklyMenu();
      for (const k in data.dinner) {
        this.menu.dinner.set(k, data.dinner[k]);
      }
    });
    this.search();
  }

  getWeekDays() {
    return this.menu.dinner.keys()
  }

  search() {
    if (this.searchString) {
      this.recipeService.search(this.searchString).subscribe(data => {
        this.searchResult = data;
        this.searchResultSummary = `${this.searchResult.length} result${this.searchResult.length > 1 ? 's' : ''}:`;
      });
    }
    else {
      this.recipeService.find().subscribe(data => {
        this.searchResult = data;
        this.searchResultSummary = 'All recipes:';
      })
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === 'searchList') {
      console.log(event.container)
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      if (event.container.id !== 'searchList') {
        transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }

    console.log(this.menu);

    this.updateMenu();
  }

  updateMenu() {
    this.weeklyMenuService.update(this.menu).subscribe(data => this.menu = data);
  }
}
