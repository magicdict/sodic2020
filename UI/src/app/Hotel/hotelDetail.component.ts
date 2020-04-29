import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService, HotelInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './hotelDetail.component.html',
})
export class HotelDetailComponent implements OnInit {
  constructor(private _location: Location, public appservice: AppService, private route: ActivatedRoute, ) {

  }
  HotelDetailInfo: HotelInfo;
  option = {};
  Return() {
    this._location.back();
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.HotelDetailInfo = this.appservice.GetHotelInfoByName(params['name']) as HotelInfo;
        this.option = {
          // 加载 bmap 组件
          bmap: {
            // 百度地图中心经纬度
            center: [this.HotelDetailInfo.lng, this.HotelDetailInfo.lat],
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