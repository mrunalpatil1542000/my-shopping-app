import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe'; //variable for storing navbar option (recipe/shopping list).

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
