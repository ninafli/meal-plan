import { Ingredient } from './ingredient';

export class Recipe {
    id: string;
    title: string;

    constructor(private ingredients: Ingredient[], private method: string[]) { }
}
