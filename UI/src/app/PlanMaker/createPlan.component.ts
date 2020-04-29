import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';


@Component({
  templateUrl: './createPlan.component.html',
})
export class CreatePlanComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
  }
  startdate: Date = new Date();
  enddate: Date = new Date();

  get Days(): number {
    let Days = Math.floor((Date.UTC(this.enddate.getFullYear(), this.enddate.getMonth(), this.enddate.getDate()) -
      Date.UTC(this.startdate.getFullYear(), this.startdate.getMonth(), this.startdate.getDate())) / (1000 * 60 * 60 * 24));
    Days = Days + 1;
    return Days;
  }

  CreatePlan() {

  }
  Return() {
    this._location.back();
  }
}
