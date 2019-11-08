import { Ingredient } from './ingredient';

export class Recipe {
    id: string;
    tags: string[];

    constructor(private ingredients: Ingredient[], private method: string[], tagSet: Set<string>, private name: string) {
        this.tags = Array.from(tagSet);
    }
}
