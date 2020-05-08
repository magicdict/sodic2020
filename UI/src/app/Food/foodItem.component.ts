import { Component, Input } from '@angular/core';
import { AppService, SpotInfo, enmItemType, HotelInfo, FoodInfo } from '../app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'food-item',
  templateUrl: './foodItem.component.html',
})
export class FoodItemComponent {
  constructor(public router: Router, public appservice: AppService) {
  }
  type = enmItemType.Food;
  @Input() Mode: number;
  @Input() Food: FoodInfo;
}
