import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, GradeASpot, SpotInfo } from '../app-service';

@Component({
  templateUrl: './spotDetail.component.html',
})
export class SpotDetailComponent implements OnInit {
  constructor(private router: Router, public appservice: AppService, private route: ActivatedRoute, ) {

  }

  SpotDetailInfo: SpotInfo;

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.SpotDetailInfo = this.appservice.GetSpotInfoByName(params['name']) as SpotInfo;
      }
    );
  }
}
