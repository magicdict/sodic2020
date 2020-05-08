import { Component, Input } from '@angular/core';
import { AppService, SpotInfo, enmItemType, HotelInfo } from '../app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'hotel-item',
  templateUrl: './hotelItem.component.html',
})
export class HotelItemComponent {
  constructor(public router: Router, public appservice: AppService) {
  }
  type = enmItemType.Hotel;
  @Input() Mode: number;
  @Input() Hotel: HotelInfo;
}
