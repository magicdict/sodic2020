import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService, SpotInfo, TourInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './spotDetail.component.html',
})
export class SpotDetailComponent implements OnInit {
  constructor(private _location: Location, public appservice: AppService, private route: ActivatedRoute, ) {
  }
  TourInfoList: TourInfo[] = [];
  SpotDetailInfo: SpotInfo;
  option = {};
  Return() {
    this._location.back();
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.SpotDetailInfo = this.appservice.GetSpotInfoByName(params['name']) as SpotInfo;
        this.TourInfoList = this.appservice.TourList.filter(x => x.Description.indexOf(this.SpotDetailInfo.Name) !== -1);
        this.option = {
          // 加载 bmap 组件
          bmap: {
            // 百度地图中心经纬度
            center: [this.SpotDetailInfo.lng, this.SpotDetailInfo.lat],
            // 百度地图缩放
            zoom: 14,
            // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
            roam: true,
            // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
            mapStyle: {}
          },
          series: [{
            type: 'effectScatter',
            // 使用百度地图坐标系
            coordinateSystem: 'bmap'
          }]
        }
      }
    );
  }
}