import { Ingredient } from './ingredient';

export class Recipe {
    id: string;

    constructor(private ingredients: Ingredient[], private method: string[], private tags: Set<string>, private name: string) { }
}
