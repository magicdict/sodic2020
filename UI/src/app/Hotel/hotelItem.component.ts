import { Component, Input } from '@angular/core';
import { AppService, enmItemType, HotelInfo } from '../app-service';
import { Router } from '@angular/router';
import { ToastService } from '../toasts/toast-service';
@Component({
  selector: 'hotel-item',
  templateUrl: './hotelItem.component.html',
})
export class HotelItemComponent {
  constructor(public router: Router, public appservice: AppService,public toastService: ToastService) {
  }
  type = enmItemType.Hotel;
  @Input() Mode: number;
  @Input() Hotel: HotelInfo;
}
