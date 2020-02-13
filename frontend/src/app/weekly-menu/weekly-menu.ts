import { Recipe } from '../recipe/recipe';
import { WeekDay } from '@angular/common';

export class WeeklyMenu {
    breakfast: Map<string, Recipe[]> = new Map();
    lunch: Map<string, Recipe[]> = new Map();
    dinner: Map<string, Recipe[]> = new Map();

    constructor() {
        for (const day in WeekDay) {
            if (typeof WeekDay[day] !== 'number') {
                this.breakfast.set(day, new Array(2));
                this.lunch.set(day, new Array(5));
                this.dinner.set(day, new Array(5));
            }
        }
    }
}
