import { Ingredient } from './ingredient';

export class Recipe {
    id: number;

    constructor(private ingredients: Ingredient[], private method: string[]) { }
}
