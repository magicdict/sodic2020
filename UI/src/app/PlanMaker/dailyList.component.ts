import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  templateUrl: './dailyList.component.html',
})
export class DailyListComponent {
  constructor(public appservice: AppService,public router: Router,
    private _location: Location) {
  }
  getItemNameList(Spotlist: any[]): string {
    let x = "";
    Spotlist.forEach(s => {
      x += s.Name + " ";
    });
    return x;
  }
  EditDaily(strDate) {
    this.appservice.CurrentDailyInfo = this.appservice.Plan.Daily.find(x => x.strDate === strDate);
    this.router.navigateByUrl('dailyplan');
  }
  Return() {
    this._location.back();
  }
}
