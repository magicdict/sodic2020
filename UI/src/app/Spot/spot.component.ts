import { Component } from '@angular/core';
import { AppService, SpotInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './spot.component.html',
})
export class SpotComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
    this.showItem = this.appservice.SpotList_GradeAOnly;
  }
  showItem: SpotInfo[];
  Search(key: string) {
    this.showItem = this.appservice.SearchSpot(key);
    console.log(this.showItem);
  }
  Return() {
    this._location.back();
  }
}
