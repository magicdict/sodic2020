import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, GradeASpot } from '../app-service';

@Component({
  templateUrl: './spotDetail.component.html',
})
export class SpotDetailComponent implements OnInit {
  constructor(private router: Router, public appservice: AppService, private route: ActivatedRoute, ) {

  }

  SpotDetailInfo: GradeASpot;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.SpotDetailInfo = this.appservice.GetSpotInfoByName(params['name']) as GradeASpot;
      }
    );
  }
}
