import { Component, Input } from '@angular/core';
import { AppService, SpotInfo, enmItemType } from '../app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'spot-item',
  templateUrl: './spotItem.component.html',
})
export class SpotItemComponent {
  constructor(public router: Router, public appservice: AppService) {
  }
  type = enmItemType.Spot;
  @Input() Spot: SpotInfo;
}
