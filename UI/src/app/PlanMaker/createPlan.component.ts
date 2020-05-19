import { Component } from '@angular/core';
import { AppService, PlanInfo, DailyInfo } from '../app-service';
import { Location } from '@angular/common';
import { differenceInDays, addDays } from 'date-fns';
import { DataStorage } from '../datastorage';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api/selectitem';

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

  CompanyWith: SelectItem[] = [
    { label: '家族', value: '家族' },
    { label: '亲子', value: '亲子' },
    { label: '朋友、同事', value: '朋友' },
    { label: '情侣、夫妻', value: '情侣' },
    { label: '一个人', value: '一个人' },
  ];
  selectedCompanyWith: string = "一个人";
  TravelTips = "选自己喜欢的地方，尽情防空吧";

  selectedcitys: SelectItem[] = this.appservice.CitySelect;
  selectedCityTypes: string[] = ["深圳市", "江门市"];

  zh = {
    firstDayOfWeek: 0,
    dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    dayNamesShort: ["日", "一", "二", "三", "四", "五", "六"],
    dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: [ "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
    monthNamesShort: [  "一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月" ],
    today: '今天',
    clear: '清除',
    dateFormat: 'mm/dd/yy',
    weekHeader: 'Wk'
  }

  ChangeTips() {
    switch (this.selectedCompanyWith) {
      case '家族':
        this.TravelTips = "红色之旅，让父母带你回到哪个年代";
        break;
      case '亲子':
        this.TravelTips = "儿童乐园，博物馆，带小朋友大开眼界吧";
        break;
      case '朋友、同事':
        this.TravelTips = "温泉，度假村，啤酒撸串走起";
        break;
      case '情侣、夫妻':
        this.TravelTips = "手牵手在海边走走吧";
        break;
      case '一个人':
        this.TravelTips = "选自己喜欢的地方，尽情防空吧";
        break;
      default:
        break;
    }
  }

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
        citys: this.selectedCityTypes,
        CompanyWith: this.selectedCompanyWith,
        Spot: [],
        Food: [],
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
