import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';
import { SelectItem } from 'primeng/api/selectitem';
import { Router } from '@angular/router';

@Component({
  templateUrl: './spot.component.html',
})
export class SpotComponent {
  constructor(public router: Router,
    public appservice: AppService,
    private _location: Location) {
  }
  types: SelectItem[] = this.appservice.CitySelect;
  selectedTypes: string[] = ["深圳市", "江门市"];
  filter(itemList: any[]): any[] {
    return itemList.filter(x => this.selectedTypes.indexOf(x.City) !== -1);
  }
  Search(key: string) {
    if (key === "") {
      this.appservice.SpotList_CurrentShow = this.appservice.SpotList_GradeA;
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
