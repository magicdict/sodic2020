import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, GradeASpot } from '../app-service';

@Component({
  templateUrl: './spot.component.html',
})
export class SpotComponent {
  constructor(private router: Router, public appservice: AppService) {
  }
}
