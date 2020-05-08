import { Component } from '@angular/core';
import { AppService, PlanInfo, DailyInfo } from '../app-service';
import { Location } from '@angular/common';
import { differenceInDays, addDays } from 'date-fns';
import { DataStorage } from '../datastorage';
import { Router } from '@angular/router';

@Component({
  templateUrl: './createPlan.component.html',
})
export class CreatePlanComponent {
  constructor(public appservice: AppService, private localstorage: DataStorage, public router: Router,
    private _location: Location) {
  }
  startdate: Date;
  enddate: Date;
  Days: number = 0;
  GetDays() {
    if (this.startdate === undefined) return 0;
    if (this.enddate === undefined) return 0;
    this.Days = differenceInDays(this.enddate, this.startdate) + 1;
  }
  CreatePlan() {
    if (this.Days === 0) return;
    let p: PlanInfo = {
      StartDate: this.startdate,
      EndDate: this.enddate,
      Daily: []
    };
    for (let index = 0; index < this.Days; index++) {
      let x = addDays(this.startdate, index);
      console.log(x.toDateString() + " Weekday:" + x.getDay())
      let d: DailyInfo = {
        strDate: x.getFullYear() + "年" + (x.getMonth() + 1) + "月" + x.getDate() + "日",
        strWeek: "星期" + this.ConvertNumberToWeekday(x.getDay()),
        Spot: [],
        Food:[],
        Hotel: null
      }
      p.Daily.push(d);
    }
    this.localstorage.Save("Plan", p);
    this.appservice.Plan = p;
    this.router.navigateByUrl('dailylist');
  }
  DeletePlan() {
    this.appservice.Plan = null;
    this.localstorage.Delete("Plan");
  }
  Return() {
    this._location.back();
  }

  public ConvertNumberToWeekday(week: number): string {
    switch (week) {
      case 0:
        return "日";
      case 1:
        return "一";
      case 2:
        return "二";
      case 3:
        return "三";
      case 4:
        return "四";
      case 5:
        return "五";
      case 6:
        return "六";
    }
  }

}
