import { Component, OnInit } from '@angular/core';
import { CommonFunction } from 'src/app/Common/common';
import { ActivatedRoute } from '@angular/router';
import { IHeatBaiduMapStardard } from 'src/app/Common/chartOption';
import { HttpClient } from '@angular/common/http';



@Component({
    templateUrl: './pricetoplow.component.html',
})
export class SimpleHeatMapComponent implements OnInit {
    constructor(private route: ActivatedRoute, private http: HttpClient, ) { }
    _commonFunction = CommonFunction;
    _map = CommonFunction.clone(IHeatBaiduMapStardard);
    _title = "";
    chart;
    ngOnInit(): void {
        this.route.params
            .subscribe(
                params => {
                    let kbn = params['name'];
                    let priceMap: Promise<{ lat: number, lng: number, value: number }[]>;
                    if (kbn === "sz") {
                        this._title = "深圳价格热力图"
                        priceMap = this.http.get<{ lat: number, lng: number, value: number }[]>("assets/json/深圳市宾馆酒店价格热力图.json").toPromise();
                    } else {
                        this._title = "江门价格热力图"
                        priceMap = this.http.get<{ lat: number, lng: number, value: number }[]>("assets/json/江门市宾馆酒店价格热力图.json").toPromise();
                    }

                    priceMap.then(
                        r => {
                            this._map.bmap.zoom = 11;
                            this._map.visualMap.max = 1000;
                            this._map.series[0].data = r.map(x => { return [x.lng, x.lat, x.value] })
                            //排序
                            let sorted = r.sort((x, y) => { return y.value - x.value }).slice(0, 10);
                            this._map.series[1].data = sorted.map(x => { return { "name": "", value: [x.lng, x.lat, x.value] } });
                            this._map.series[1].symbolSize = this.symbolSizeForHotel;
                            this._map.bmap.center = [r[0].lng, r[0].lat];
                            this.chart.setOption(this._map);
                        }
                    )
                }
            );
    }
    symbolSizeForHotel(val: any) {
        return val[2] / 500;
    };
    GetChart(chart: any) {
        this.chart = chart;
    }
}

