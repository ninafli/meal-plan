import { Recipe } from '../recipe/recipe';
import { WeekDay } from '@angular/common';

export class WeeklyMenu {
    dinner: Recipe[][];

    constructor() {
        this.dinner = new Array();

        for (const day in WeeklyMenu.getWeekDayStringArray()) {
            this.dinner[WeekDay[day]] = new Array();
            for (let j = 0; j < 5; j++) {
                this.dinner[WeekDay[day]].push(WeekDay[day] + j);
            }
        }
    }

    static getWeekDayStringArray(): string[] {
        return Object.keys(WeekDay).filter(day => typeof WeekDay[day] === 'number');
    }
}
