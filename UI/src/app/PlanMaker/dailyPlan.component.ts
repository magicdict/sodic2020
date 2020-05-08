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

  Return() {
    this._location.back();
  }
}
