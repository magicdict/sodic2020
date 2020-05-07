import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService, FoodInfo } from '../app-service';
import { Location } from '@angular/common';

@Component({
  templateUrl: './foodDetail.component.html',
})
export class FoodDetailComponent implements OnInit {
  constructor(private _location: Location, public appservice: AppService, private route: ActivatedRoute, ) {

  }
  FoodDetailInfo: FoodInfo;
  option = {};
  opiton_wordcoudy = {};
  Return() {
    this._location.back();
  }
  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        this.FoodDetailInfo = this.appservice.GetFoodInfoByName(params['name']) as FoodInfo;
        this.option = {
          // 加载 bmap 组件
          bmap: {
            // 百度地图中心经纬度
            center: [this.FoodDetailInfo.lng, this.FoodDetailInfo.lat],
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
            data: this.FoodDetailInfo.WordCloud
          }]
        };


      }
    );
  }
}