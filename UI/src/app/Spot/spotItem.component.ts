import { Component, Input } from '@angular/core';
import { GradeASpot } from '../app-service';

@Component({
  selector: 'spot-item',
  templateUrl: './spotItem.component.html',
})
export class SpotItemComponent {
  @Input() SpotInfo: GradeASpot;
}
