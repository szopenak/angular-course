export class Ingredient {
    constructor(public name: string, public amount: number) {
        this.amount = amount;
        this.name = name;
    }
    toString() {
        return this.name + " - " + this.amount;
    }
}