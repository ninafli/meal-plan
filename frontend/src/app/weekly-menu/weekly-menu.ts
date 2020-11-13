import { Recipe } from '../recipe/recipe';
import { WeekDay } from '@angular/common';

export class WeeklyMenu {
    dinner = new Map<String, Recipe[]>();
}
