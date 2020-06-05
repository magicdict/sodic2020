import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService, SpotInfo, TourInfo } from '../app-service';
import { Location } from '@angular/common';
import { ToastService } from '../toasts/toast-service';
@Component({
  templateUrl: './spotDetail.component.html',
})
export class SpotDetailComponent implements OnInit {
  constructor(private _location: Location,
    public appservice: AppService,
    private route: ActivatedRoute,
    public router: Router,
    public toastService: ToastService) {
  }
  TourInfoList: TourInfo[] = [];
  SpotDetailInfo: SpotInfo;
  option = {
    // 加载 bmap 组件
    bmap: {
      // 百度地图中心经纬度
      center: [],
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
      data: [],
      symbolSize: 20,
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
  };
  opiton_wordcoudy = {};
  distence: string;
  isStop: boolean;
  index: number; //Active Tab Index
  Return() {
    this._location.back();
  }
  map_chart: any;
  mapchart(c: any) {
    console.log("mapchart");
    this.map_chart = c;
  }
  ngOnInit(): void {
    this.route.data.subscribe(
      (xxx: { spot: SpotInfo }) => {
        this.SpotDetailInfo = xxx.spot;
        this.index = 0;
        if (this.SpotDetailInfo.Name === null) {
          return;
        }
        this.TourInfoList = this.appservice.TourList.filter(
          (x) => {
            if (this.SpotDetailInfo.Name === "沙头角中英街") return x.Description.indexOf("中英街") !== -1;
            if (this.SpotDetailInfo.Name === "深圳欢乐谷") return x.Description.indexOf("欢乐谷") !== -1;
            if (this.SpotDetailInfo.Name === "鹏城美丽乡村") return x.Description.indexOf("鹏城美丽乡村") !== -1;
            if (this.SpotDetailInfo.Name.startsWith("地王")) return x.Description.indexOf("地王") !== -1;
            return x.Description.indexOf(this.SpotDetailInfo.Name) !== -1;
          }
        );
        if (this.SpotDetailInfo.OpenTime.indexOf("暂停营业") !== -1) this.isStop = true;
        if (this.SpotDetailInfo.OpenTime.indexOf("暂时停业") !== -1) this.isStop = true;
        console.log("this.appservice.myposition.lat:" + AppService.myposition.lat + "," + AppService.myposition.lng)
        console.log("this.SpotDetailInfo.lat:" + this.SpotDetailInfo.lat + "," + this.SpotDetailInfo.lng);
        let mapPoint = [[this.SpotDetailInfo.lng, this.SpotDetailInfo.lat, 1, this.SpotDetailInfo.Name]];
        if (AppService.myposition.lat !== -1) {
          this.distence = this.appservice.distanceByLnglat(this.SpotDetailInfo.lng, this.SpotDetailInfo.lat, AppService.myposition.lng, AppService.myposition.lat);
          mapPoint.push([AppService.myposition.lng, AppService.myposition.lat, 2, "您的位置"])
        }

        this.option.bmap.center = [this.SpotDetailInfo.lng, this.SpotDetailInfo.lat]
        this.option.series[0].data = mapPoint;
        if (this.map_chart !== undefined) {
          //第二次设置中心点的时候，中心点位于整个图形的左上角，所以使用定时器延时修正
          setTimeout(() => {
            this.map_chart.setOption(this.option);
          }, 1000);
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
            data: this.SpotDetailInfo.WordCloud
          }]
        };
      }
    );
  }
  JumpToSpot() {
    this.appservice.IsAddToPlanMode = false;
    this.appservice.SpotList_CurrentShow = this.appservice.SpotList_GradeA;
    this.router.navigateByUrl('spot');
  }
}