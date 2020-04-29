import { Component } from '@angular/core';
import { AppService, HotelInfo, enmItemType } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  templateUrl: './hotel.component.html',
})
export class HotelComponent {
  constructor(public appservice: AppService,public router: Router,
    private _location: Location) {
    this.showItem = this.appservice.HotelList_CurrentShow;
  }
  showItem: HotelInfo[];
  type = enmItemType.Hotel;
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
