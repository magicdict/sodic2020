import { Component } from '@angular/core';
import { AppService, HotelInfo, enmItemType } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  templateUrl: './hotel.component.html',
})
export class HotelComponent {
  constructor(public appservice: AppService, public router: Router,
    private _location: Location) {

  }
  showItem: HotelInfo[];
  type = enmItemType.Hotel;
  types: SelectItem[] = this.appservice.CitySelect;
  selectedTypes: string[] = ["深圳市", "江门市"];
  filter(itemList: any[]): any[] {
    return itemList.filter(x => this.selectedTypes.indexOf(x.City) !== -1);
  }
  Search(key: string) {
    if (key === "") {
      this.appservice.HotelList_CurrentShow = this.appservice.HotelList_Hot;
      return;
    }
    this.appservice.SearchHotel(key).then(
      r => {
        r = r.sort((x, y) => {
          return y.CommentCount - x.CommentCount
        })
        this.appservice.HotelList_CurrentShow = r;
      });
  }
  Return() {
    this._location.back();
  }
}
