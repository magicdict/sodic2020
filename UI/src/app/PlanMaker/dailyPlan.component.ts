import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { enmItemType } from '../Model';


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
  PlusFar(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.SpotList_CurrentShow = this.appservice.favorites.filter(x=>x.ItemType === enmItemType.Spot);
    this.router.navigateByUrl('spot');
  }


  PlusHotFood(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.FoodList_CurrentShow = this.appservice.FoodList_Hot;
    this.router.navigateByUrl('food');
  }

  PlusFavFood(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.FoodList_CurrentShow = this.appservice.favorites.filter(x=>x.ItemType === enmItemType.Food);
    this.router.navigateByUrl('food');
  }

  PlusHotHotel(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.HotelList_CurrentShow = this.appservice.HotelList_Hot;
    this.router.navigateByUrl('hotel');
  }

  PlusFavHotel(){
    this.appservice.IsAddToPlanMode = true;
    this.appservice.HotelList_CurrentShow = this.appservice.favorites.filter(x=>x.ItemType === enmItemType.Hotel);
    this.router.navigateByUrl('hotel');
  }

  Return() {
    this._location.back();
  }
}
