import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { POIInfo } from '../Modal';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
    templateUrl: './spotoverview.component.html',
})
export class SpotOverviewComponent implements OnInit {

    constructor(
        public router: Router, private route: ActivatedRoute,
        private http: HttpClient,
    ) {

    }
    Spot_total: POIInfo[];
    Park_total: POIInfo[];
    ngOnInit(): void {
        this.route.params.subscribe(
            params => {
                let kbn = params['name'];
                let spot: Promise<POIInfo[]>;
                let park: Promise<POIInfo[]>;
                this._map.bmap.zoom = 15;
                if (kbn === "sz") {
                    this._title = "深圳景点"
                    spot = this.http.get("assets/json/深圳市旅游景点信息.json").toPromise().then(x => x as POIInfo[]);
                    park = this.http.get("assets/json/深圳市景点停车场信息.json").toPromise().then(x => x as POIInfo[]);
                } else {
                    this._title = "江门景点"
                    spot = this.http.get("assets/json/江门市旅游景点信息.json").toPromise().then(x => x as POIInfo[]);
                    park = this.http.get("assets/json/江门市景点停车场信息.json").toPromise().then(x => x as POIInfo[]);
                }
                spot.then(
                    r => {
                        this.Spot_total = r;
                        this._map.bmap.center = [r[0].lng, r[0].lat];
                        this._map.series[0].data = r.filter(x => x.ALevel === "").map(x => [x.lng, x.lat, 0, "玩", x.Name]);
                        //重要的放在最下面，绘制的时候则在最上面
                        this._map.series[1].data = r.filter(x => x.ALevel !== "").map(x => [x.lng, x.lat, x.ALevel.length, x.Name, x.Name]);
                        this.chart.setOption(this._map);
                    }
                )
                park.then(
                    r => {
                        this.Park_total = r;
                        this._map.series[2].data = r.map(x => [x.lng, x.lat, 0, "P", x.Name]);
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
        tooltip: {
            trigger: 'item',
            formatter: this.SpotToolTip,
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
        },
        {
            type: 'effectScatter',
            // 使用百度地图坐标系
            coordinateSystem: 'bmap',
            data: [[]],
            symbolSize: 10,
            itemStyle: {
                normal: {
                    color: 'blue',
                    shadowBlur: 15,
                    shadowColor: '#333'
                }
            },
            label: {
                show: true,
                formatter: "{@[3]}"
            }
        }
        ]
    }

    symbolSizeForHigh(val: any) {
        return val[2] * 10;
    };
    SpotToolTip(val: any) {
        if (val.data[2] ===0){
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + val.data[4]
            + '</div>'
        }else{
            let url = "http://datavisualization.club:8888/assets/image/spot/" + val.data[4] + ".jpg";
            return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
            + val.data[4]
            + '</div>'
            + '<img src="' + url + '" width="320px" height="320px" />';
        }
    }
    symbolSizeForLow(val: any) {
        return 15;
    };

    GetChart(chart: any) {
        this.chart = chart;
    }
    ParkStatusChange(status: boolean) {
        if (status) {
            this._map.series[2].data = this.Park_total.map(x => [x.lng, x.lat, 0, "P", x.Name]);
            this.chart.setOption(this._map);
        } else {
            this._map.series[2].data = [];
            this.chart.setOption(this._map);
        }
    }
    Search(key: string) {
        let r = this.Spot_total.filter(x => x.Name.indexOf(key) !== -1);
        if (r.length === 0) {
            r = this.Spot_total;
        }
        this._map.bmap.center = [r[0].lng, r[0].lat];
        this._map.series[0].data = r.filter(x => x.ALevel === "").map(x => [x.lng, x.lat, 0, "玩", x.Name]);
        //重要的放在最下面，绘制的时候则在最上面
        this._map.series[1].data = r.filter(x => x.ALevel !== "").map(x => [x.lng, x.lat, x.ALevel.length, x.Name, x.Name]);
        this.chart.setOption(this._map);
    }
    spotType: SelectItem[] = [
        { label: '红色', value: '红色' },
        { label: '亲子', value: '亲子' },
        { label: '文化', value: '文化' },
        { label: '休闲', value: '休闲' },
        { label: '全部', value: '全部' },
    ];
    selectedspotType: string = "全部";
    spotTypeSwith() {
        let r = this.Spot_total.filter(x => x.Type.indexOf(this.selectedspotType) !== -1);
        if (this.selectedspotType === "全部") {
            r = this.Spot_total;
        }
        this._map.bmap.center = [r[0].lng, r[0].lat];
        this._map.series[0].data = r.filter(x => x.ALevel === "").map(x => [x.lng, x.lat, 0, "玩", x.Name]);
        //重要的放在最下面，绘制的时候则在最上面
        this._map.series[1].data = r.filter(x => x.ALevel !== "").map(x => [x.lng, x.lat, x.ALevel.length, x.Name, x.Name]);
        this.chart.setOption(this._map);
    }
}