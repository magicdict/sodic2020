import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';


@Component({
  templateUrl: './dailyPlan.component.html',
})
export class DailyPlanComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
  }
  
  Return() {
    this._location.back();
  }
}
