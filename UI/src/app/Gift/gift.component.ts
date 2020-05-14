import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AppService, GiftInfo, enmItemType } from '../app-service';
import { ToastService } from '../toasts/toast-service';
@Component({
  templateUrl: './gift.component.html',
})
export class GiftComponent implements OnInit {
  ShowItem: GiftInfo[] = [];
  constructor(private _location: Location, public appservice: AppService, public toastService: ToastService ) {

  }
  type = enmItemType.Gift;
  ngOnInit(): void {
    this.ShowItem = this.appservice.GiftList.slice(0, 50);
  }
  Return() {
    this._location.back();
  }
  Search(key: string) {
    if (key === "") {
      this.ShowItem = this.appservice.GiftList.slice(0, 50);
    } else {
      this.ShowItem = this.appservice.GiftList.filter(x => x.Name.indexOf(key) !== -1);
    }
  }
}
