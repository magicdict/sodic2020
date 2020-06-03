import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    public router: Router,
    public app: AppService
  ) {
    //在首页事先将AppService初始化掉！
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  JumpToSpot(){
    this.app.IsAddToPlanMode = false;
    this.app.SpotList_CurrentShow = this.app.SpotList_GradeA;
    this.router.navigateByUrl('spot');
  }

  JumpToFood(){
    this.app.IsAddToPlanMode = false;
    this.app.FoodList_CurrentShow = this.app.FoodList_Hot;
    this.router.navigateByUrl('food');
  }

  JumpToHotel(){
    this.app.IsAddToPlanMode = false;
    this.app.HotelList_CurrentShow = this.app.HotelList_Hot;
    this.router.navigateByUrl('hotel');
  }

  SimulateLocation(){
    AppService.myposition = { lat: 22.544672905021145, lng: 113.98615590628268 };
  }

}
