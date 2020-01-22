export class Ingredient {
    amount: number;
    unit: string;
    prepMethod: string;
    rawIngredient: string;

    public toDisplay = (): string => this.rawIngredient;
    public display(): string {
        return 'nina';
    }
}
