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

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  @Input() menu?: WeeklyMenu;
  template: any[];
  connectedTo: string[] = new Array();

  constructor() {

    this.template = new Array();
    let i = 0;

    for (const day in WeekDay) {
      if (isNaN(Number(day))) {
        this.template[i] = { id: day, list: new Array(12) };
        this.connectedTo.push(day);
        for (let j = 0; j < 12; j++) {
          this.template[i].list[j] = day + j;
        }
        i++;
      }
    }
  }

  ngOnInit() {
  }

  getWeekDayStringArray(): string[] {
    return Object.keys(WeekDay).filter(day => typeof WeekDay[day] === 'number');
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
