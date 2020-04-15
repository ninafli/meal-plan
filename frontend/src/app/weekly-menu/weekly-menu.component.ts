import { WeekDay } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { WeeklyMenu } from './weekly-menu';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrls: ['./weekly-menu.component.css']
})
export class WeeklyMenuComponent implements OnInit {

  @Input() menu?: WeeklyMenu;
  template: any[];

  constructor() {
  }

  ngOnInit() {
    if (!this.menu) {
      this.menu = new WeeklyMenu();
    }
  }

  getWeekDayStringArray(): string[] {
    return WeeklyMenu.getWeekDayStringArray();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
