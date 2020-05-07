import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { POIInfo } from '../Modal';

@Component({
    templateUrl: './spotoverview.component.html',
})
export class SpotOverviewComponent implements OnInit {

    constructor(
        public router: Router, private route: ActivatedRoute,
        private http: HttpClient,
    ) {

    }
    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                let kbn = params['name'];
                let spot: Promise<POIInfo[]>;
                this._map.bmap.zoom = 15;
                if (kbn === "sz") {
                    this._title = "深圳景点"
                    spot = this.http.get("assets/json/深圳市旅游景点信息.json").toPromise().then(x => x as POIInfo[]);
                } else {
                    this._title = "江门景点"
                    spot = this.http.get("assets/json/江门市旅游景点信息.json").toPromise().then(x => x as POIInfo[]);
                }
                spot.then(
                    r => {
                        this._map.bmap.center = [r[0].lng, r[0].lat];
                        this._map.series[0].data = r.filter(x => x.ALevel === "").map(x => [x.lng, x.lat, 0, x.Name]);
                        //重要的放在最下面，绘制的时候则在最上面
                        this._map.series[1].data = r.filter(x => x.ALevel !== "").map(x => [x.lng, x.lat, x.ALevel.length, x.Name]);
                        this.chart.setOption(this._map);
                    }
                )
            });
    }
    _title;
    chart;
    _commonFunction = CommonFunction;
    _map = {
        // 加载 bmap 组件
        bmap: {
            // 百度地图中心经纬度
            center: [],
            // 百度地图缩放
            zoom: 16,
            // 是否开启拖拽缩放，可以只设置 'scale' 或者 'move'
            roam: true,
            // 百度地图的自定义样式，见 http://developer.baidu.com/map/jsdevelop-11.htm
            mapStyle: {}
        },
        series: [{
            type: 'effectScatter',
            // 使用百度地图坐标系
            coordinateSystem: 'bmap',
            data: [[]],
            symbolSize: this.symbolSizeForLow,
            itemStyle: {
                normal: {
                    shadowBlur: 15,
                    shadowColor: '#333'
                }
            },
            label: {
                show: true,
                formatter: "{@[3]}"
            }
        },
        {
            type: 'effectScatter',
            // 使用百度地图坐标系
            coordinateSystem: 'bmap',
            data: [[]],
            symbolSize: this.symbolSizeForHigh,
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 15,
                    shadowColor: '#333'
                }
            },
            label: {
                show: true,
                formatter: "{@[3]}"
            }
        }]
    }

    symbolSizeForHigh(val: any) {
        return val[2] * 10;
    };

    symbolSizeForLow(val: any) {
        return 15;
    };

    GetChart(chart: any) {
        this.chart = chart;
    }
}