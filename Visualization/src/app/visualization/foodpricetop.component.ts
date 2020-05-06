import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FoodInfo } from '../Modal';

@Component({
    templateUrl: './foodpricetop.component.html',
})
export class FoodPriceTopComponent implements OnInit {
    constructor(
        public router: Router,
        private http: HttpClient,
    ) {
        //在首页事先将AppService初始化掉！
    }
    ngOnInit(): void {
        let spot_gradeA = this.http.get("assets/json/深圳市美食信息价格TOP50.json").toPromise().then(x => x as FoodInfo[]);
        spot_gradeA.then(
            r => {
                this.option.bmap.center = [r[0].lng, r[0].lat];
                this.option.series[0].data = r.map(x => [x.lng, x.lat, x.Price]);
                console.log(this.option);
                this.chart.setOption(this.option);
            }
        )
    }

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    option = {
        // 加载 bmap 组件
        bmap: {
            // 百度地图中心经纬度
            center: [],
            // 百度地图缩放
            zoom: 11,
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
            symbolSize:this.symbolSizeForPR
        }]
    }
    symbolSizeForPR(val: any) {
        return Math.sqrt(val[2]/10);
    };
    chart;
    
    GetChart(chart:any){
        this.chart = chart;
    }
}
