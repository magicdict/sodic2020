import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './help.component.html',
})
export class HelpComponent {
  constructor(public appservice: AppService,
    private _location: Location) {
  }
  Return() {
    this._location.back();
  }
}
