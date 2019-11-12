import { Ingredient } from './ingredient';

export class Recipe {
  id: string;
  tags: string[];

  constructor(public ingredients: Ingredient[], public method: string[], public tagSet: Set<string>, public name: string) {
    this.tags = Array.from(tagSet);
  }
}
