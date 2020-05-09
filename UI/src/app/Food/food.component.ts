import { Component } from '@angular/core';
import { AppService, enmItemType } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  templateUrl: './food.component.html',
})
export class FoodComponent {
  constructor(public router: Router,public appservice: AppService,
    private _location: Location) {
  }
  type = enmItemType.Food;
  types: SelectItem[] = this.appservice.CitySelect;
  selectedTypes: string[] = ["深圳市", "江门市"];
  filter(itemList: any[]): any[] {
    return itemList.filter(x => this.selectedTypes.indexOf(x.City) !== -1);
  }
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
