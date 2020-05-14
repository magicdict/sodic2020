import { Component, Input } from '@angular/core';
import { AppService, SpotInfo, enmItemType } from '../app-service';
import { Router } from '@angular/router';
import { ToastService } from '../toasts/toast-service';
@Component({
  selector: 'spot-item',
  templateUrl: './spotItem.component.html',
})
export class SpotItemComponent {
  constructor(public router: Router, public appservice: AppService,public toastService: ToastService) {
  }
  type = enmItemType.Spot;
  @Input() Mode: number;
  @Input() Spot: SpotInfo;
}
