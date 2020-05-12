import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  templateUrl: './dailyPlan.component.html',
})
export class DailyPlanComponent {
  constructor(
    public appservice: AppService, 
    public router: Router,
    private _location: Location) {
  }
  PlusASpot(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_GradeA;
    this.router.navigateByUrl('spot');
  }
  PlusRed(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_Red;
    this.router.navigateByUrl('spot');
  }
  PlusRelax(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_Relax;
    this.router.navigateByUrl('spot');
  }
  PlusCult(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_Cult;
    this.router.navigateByUrl('spot');
  }
  PlusChild(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_Child;
    this.router.navigateByUrl('spot');
  }
  Return() {
    this._location.back();
  }
}
