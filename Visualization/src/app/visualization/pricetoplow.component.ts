import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { POIInfo } from '../Modal';
import { CommonFunction } from '../Common/common';

@Component({
    templateUrl: './pricetoplow.component.html',
})
export class PriceTopLowComponent implements OnInit {
    constructor(
        public router: Router, private route: ActivatedRoute,
        private http: HttpClient,
    ) {
        //在首页事先将AppService初始化掉！
    }
    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                let kbn = params['name'];
                let cls: string = this.route.snapshot["_routerState"].url;
                let top50: any;
                let low50: any;
                if (cls.indexOf("hotel") === -1) {
                    this._map.bmap.zoom = 12;
                    if (kbn === "sz") {
                        this._title = "深圳美食最高和最低人均消费"
                        top50 = this.http.get("assets/json/深圳市美食价格TOP50.json").toPromise().then(x => x as POIInfo[]);
                        low50 = this.http.get("assets/json/深圳市美食价格LOW50.json").toPromise().then(x => x as POIInfo[]);
                    } else {
                        this._title = "江门美食最高和最低人均消费"
                        top50 = this.http.get("assets/json/江门市美食价格TOP50.json").toPromise().then(x => x as POIInfo[]);
                        low50 = this.http.get("assets/json/江门市美食价格LOW50.json").toPromise().then(x => x as POIInfo[]);
                    }
                } else {
                    this._map.series[0].symbolSize = this.symbolSizeForHighHotel;
                    this._map.bmap.zoom = 12;
                    if (kbn === "sz") {
                        this._title = "深圳酒店最高和最低人均消费"
                        top50 = this.http.get("assets/json/深圳市宾馆酒店价格TOP50.json").toPromise().then(x => x as POIInfo[]);
                        low50 = this.http.get("assets/json/深圳市宾馆酒店价格LOW50.json").toPromise().then(x => x as POIInfo[]);
                    } else {
                        this._title = "江门酒店最高和最低人均消费"
                        top50 = this.http.get("assets/json/江门市宾馆酒店价格TOP50.json").toPromise().then(x => x as POIInfo[]);
                        low50 = this.http.get("assets/json/江门市宾馆酒店价格LOW50.json").toPromise().then(x => x as POIInfo[]);
                    }
                }

                top50.then(
                    r => {
                        this._map.bmap.center = [r[0].lng, r[0].lat];
                        this._map.series[0].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
                        this.chart.setOption(this._map);
                    }
                )
                low50.then(
                    r => {
                        this._map.series[1].data = r.map(x => [x.lng, x.lat, x.Price, x.Name]);
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
        return Math.min(100, Math.sqrt(val[2]));
    };

    symbolSizeForHighHotel(val: any) {
        return Math.min(100, Math.sqrt(val[2] / 10));
    };

    symbolSizeForLow(val: any) {
        return Math.sqrt(val[2] * 10);
    };



    GetChart(chart: any) {
        this.chart = chart;
    }

}
