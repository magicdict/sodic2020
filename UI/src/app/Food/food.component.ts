import { Component } from '@angular/core';
import { AppService, FoodInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './food.component.html',
})
export class FoodComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
    this.showItem = this.appservice.FoodList_SZ;
  }
  showItem: FoodInfo[];
  Search(key: string) {
    this.showItem = this.appservice.SearchFood(key);
    console.log(this.showItem);
  }
  Return() {
    this._location.back();
  }
}
