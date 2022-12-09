import { Component } from '@angular/core';

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {}

  onSaveData() {                            
    this.dataStorageService.storeRecipes();              //storeRecipes - method of DataStorageService (to store data in firebase)
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();  //fetchRecipes - method of DataStorageService (to fetch data from firebase)
  }
}
