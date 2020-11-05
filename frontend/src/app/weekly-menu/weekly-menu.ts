import { Recipe } from '../recipe/recipe';
import { WeekDay } from '@angular/common';

export class WeeklyMenu {
    dinner = new Map();

    constructor() {
        // tslint:disable-next-line:forin
        for (const day of WeeklyMenu.getWeekDayStringArray()) {
            this.dinner.set(day, <Recipe[]>[]);
        }
    }

    static getWeekDayStringArray(): string[] {
        return Object.keys(WeekDay).map(key => WeekDay[key]).filter(value => typeof value === 'string');
    }
}
