export class Recipe {
    public name: string;
    public description: string;
    public imageUrl: string;
    constructor(name: string, desc: string, url: string) {
        this.description = desc;
        this.imageUrl = url;
        this.name = name;
    }
}