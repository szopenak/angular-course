import {Ingredient} from '../shared/ingredient.model'

export class Recipe {
    public name: string;
    public ingredients: Ingredient[];
    public steps: string[];
    public time: number;
    public uid: string;
    constructor(name: string, ingredients: Ingredient[], steps: string[], time:number, uid: string ) {
        this.name = name;
        this.ingredients = ingredients;
        this.steps = steps;
        this.time = time;
        this.uid = uid;
    }
}