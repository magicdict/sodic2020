import { Component } from '@angular/core';
import { AppService, FoodInfo, enmItemType } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  templateUrl: './food.component.html',
})
export class FoodComponent {
  constructor(public router: Router,public appservice: AppService,
    private _location: Location) {
    this.showItem = this.appservice.FoodList_CurrentShow;
  }
  showItem: FoodInfo[];
  type = enmItemType.Food;
  Search(key: string) {
    if (key === "") {
      this.appservice.FoodList_CurrentShow = this.appservice.FoodList_Hot;
      return;
    }
    this.appservice.SearchFood(key).then(
      r => {
        r = r.sort((x, y) => {
          return y.CommentCount - x.CommentCount
        })
        this.appservice.FoodList_CurrentShow = r;
      });
  }
  Return() {
    this._location.back();
  }
}
