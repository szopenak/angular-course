import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipes-app';
  showRecipes: boolean = true;

  sectionChange(section: string) {
    this.showRecipes = section === 'recipes' ? true : false;
  }

}
