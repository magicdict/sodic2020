import { Component } from '@angular/core';
import { AppService, SpotInfo, enmItemType } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './spot.component.html',
})
export class SpotComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
  }

  Search(key: string) {
    if (key === "") {
      this.appservice.SpotList_CurrentShow = this.appservice.SpotList_GradeAOnly;
      return;
    }
    this.appservice.SearchSpot(key).then(
      r => {
        r = r.sort((x, y) => {
          return y.CommentCount - x.CommentCount
        })
        this.appservice.SpotList_CurrentShow = r;
      });
  }
  Return() {
    this._location.back();
  }
}
