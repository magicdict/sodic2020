import { Component, Input } from '@angular/core';
import { AppService, enmItemType, FoodInfo } from '../app-service';
import { Router } from '@angular/router';
import { ToastService } from '../toasts/toast-service';
@Component({
  selector: 'food-item',
  templateUrl: './foodItem.component.html',
})
export class FoodItemComponent {
  constructor(public router: Router, public appservice: AppService,public toastService: ToastService) {
  }
  type = enmItemType.Food;
  @Input() Mode: number;
  @Input() Food: FoodInfo;
}
