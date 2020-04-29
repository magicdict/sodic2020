import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './favItem.component.html',
})
export class FavItemComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
  }
  Return() {
    this._location.back();
  }
}
