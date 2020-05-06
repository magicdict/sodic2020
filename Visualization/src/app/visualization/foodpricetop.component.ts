import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FoodInfo } from '../Modal';
import { CommonFunction } from '../Common/common';

@Component({
    templateUrl: './foodpricetop.component.html',
})
export class FoodPriceTopComponent implements OnInit {
    constructor(
        public router: Router,private route: ActivatedRoute,
        private http: HttpClient,
    ) {
        //在首页事先将AppService初始化掉！
    }
    ngOnInit(): void {

        this.route.params.subscribe(
            params => {
                let kbn = params['name'];
                if (kbn === "sz"){
                    this._title = "深圳"
                    let top50_sz = this.http.get("assets/json/深圳市美食信息价格TOP50.json").toPromise().then(x => x as FoodInfo[]);
                    top50_sz.then(
                        r => {
                            this._map.bmap.center = [r[0].lng, r[0].lat];
                            this._map.series[0].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
                            this.chart.setOption(this._map);
                        }
                    )
                    let low50_sz = this.http.get("assets/json/深圳市美食信息价格LOW50.json").toPromise().then(x => x as FoodInfo[]);
                    low50_sz.then(
                        r => {
                            this._map.series[1].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
                            this.chart.setOption(this._map);
                        }
                    )
                }else{
                    this._title = "江门"
                    let top50_jm = this.http.get("assets/json/江门市美食信息价格TOP50.json").toPromise().then(x => x as FoodInfo[]);
                    top50_jm.then(
                        r => {
                            this._map.bmap.center = [r[0].lng, r[0].lat];
                            this._map.series[0].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
                            this.chart.setOption(this._map);
                        }
                    )
                    let low50_jm = this.http.get("assets/json/江门市美食信息价格LOW50.json").toPromise().then(x => x as FoodInfo[]);
                    low50_jm.then(
                        r => {
                            this._map.series[1].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
                            this.chart.setOption(this._map);
                        }
                    )
                }
            });
    }

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    _title;
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
            symbolSize: this.symbolSizeForHigh,
            itemStyle: {
                normal: {
                    color: 'purple',
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            label: {
                show: true,
                formatter: "{@[3]}\n{@[2]}"
            }
        }, {
            type: 'effectScatter',
            // 使用百度地图坐标系
            coordinateSystem: 'bmap',
            data: [[]],
            symbolSize: this.symbolSizeForLow,
            itemStyle: {
                normal: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            label: {
                show: true,
                formatter: "{@[3]}\n{@[2]}"
            }
        }]
    }

      symbolSizeForHigh(val: any) {
        return Math.sqrt(val[2]);
    };
    symbolSizeForLow(val: any) {
        return Math.sqrt(val[2] * 10);
    };

    chart;
  
    GetChart(chart: any) {
        this.chart = chart;
    }
  
}
