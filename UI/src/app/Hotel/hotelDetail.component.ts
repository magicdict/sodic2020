import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, HotelInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './hotelDetail.component.html',
})
export class HotelDetailComponent implements OnInit {
  constructor(
    private _location: Location,
    public appservice: AppService,
    private route: ActivatedRoute,
    public router: Router,
  ) {

  }
  HotelDetailInfo: HotelInfo;
  option = {};
  opiton_wordcoudy = {};
  distence: string;
  Return() {
    this._location.back();
  }
  JumpToHotel() {
    this.appservice.IsAddToPlanMode = false;
    this.appservice.HotelList_CurrentShow = this.appservice.HotelList_Hot;
    this.router.navigateByUrl('hotel');
  }
  ngOnInit(): void {
    this.route.data.subscribe(
      (xxx: { hotel: HotelInfo }) => {
        this.HotelDetailInfo = xxx.hotel;
        if (this.HotelDetailInfo.Name === null) {
          return;
        }
        console.log("this.appservice.myposition.lat:" + AppService.myposition.lat)
        let mapPoint = [[this.HotelDetailInfo.lng, this.HotelDetailInfo.lat, 1, this.HotelDetailInfo.Name]];
        if (AppService.myposition.lat !== -1) {
          this.distence = this.appservice.distanceByLnglat(this.HotelDetailInfo.lng, this.HotelDetailInfo.lat, AppService.myposition.lng, AppService.myposition.lat);
          mapPoint.push([AppService.myposition.lng, AppService.myposition.lat, 2, "您的位置"])
        }
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
            coordinateSystem: 'bmap',
            symbolSize: 20,
            data: mapPoint,
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            label: {
              show: true,
              formatter: "{@[3]}"
            }
          }]
        }

        this.opiton_wordcoudy = {
          tooltip: {
            show: true
          },
          series: [{
            name: '评论词云',
            type: 'wordCloud',
            sizeRange: [10, 50],//文字范围
            //文本旋转范围，文本将通过rotationStep45在[-90,90]范围内随机旋转
            rotationRange: [-45, 90],
            rotationStep: 45,
            textRotation: [0, 45, 90, -45],
            //形状
            shape: 'circle',
            textStyle: {
              normal: {
                color: function () {//文字颜色的随机色
                  return 'rgb(' + [
                    Math.round(Math.random() * 250),
                    Math.round(Math.random() * 250),
                    Math.round(Math.random() * 250)
                  ].join(',') + ')';
                }
              },
              //悬停上去的颜色设置
              emphasis: {
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            data: this.HotelDetailInfo.WordCloud
          }]
        };
      }
    );
  }
}