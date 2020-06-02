import { Component, Input } from '@angular/core';
import { AppService, SpotInfo, enmItemType } from '../app-service';
import { Router } from '@angular/router';
import { ToastService } from '../toasts/toast-service';
@Component({
  selector: 'spot-item',
  templateUrl: './spotItem.component.html',
})
export class SpotItemComponent {
  constructor(public router: Router, public appservice: AppService, public toastService: ToastService) {
  }
  type = enmItemType.Spot;
  @Input() Mode: number;
  @Input() Spot: SpotInfo;
  isStop(): boolean {
    if (this.Spot.OpenTime.indexOf("暂停营业") !== -1) return true;
    if (this.Spot.OpenTime.indexOf("暂时停业") !== -1) return true;
    return false;
  }
}
