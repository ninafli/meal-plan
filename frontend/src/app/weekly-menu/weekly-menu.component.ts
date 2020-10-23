import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { WeeklyMenu } from './weekly-menu';
import { Recipe } from '../recipe/recipe';
import { RecipeService } from '../recipe/recipe.service';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.css']
})
export class WeeklyMenuMainComponent implements OnInit {

  @Input() menu?: WeeklyMenu;
  template: any[];
  public searchString: string;
  public searchResult: Recipe[];
  public searchResultSummary: string;
  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    if (!this.menu) {
      this.menu = new WeeklyMenu();
    }
    this.search();
  }

  getWeekDayStringArray(): string[] {
    return WeeklyMenu.getWeekDayStringArray();
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
  }


}
