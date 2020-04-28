import { Component } from '@angular/core';
import { AppService, HotelInfo } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  templateUrl: './hotel.component.html',
})
export class HotelComponent {
  constructor(public appservice: AppService,public router: Router,
    private _location: Location) {
    this.showItem = this.appservice.HotelList_Hot;
  }
  showItem: HotelInfo[];
  Search(key: string) {
    this.showItem = this.appservice.SearchHotel(key);
    console.log(this.showItem);
  }
  Return() {
    this._location.back();
  }
}
