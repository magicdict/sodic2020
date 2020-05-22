import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { IBarStardard, IScatter3DStardard } from '../Common/chartOption';
import { SpotInfo } from '../Modal';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './basicinfo.component.html',
})
export class BasicInfoComponent implements OnInit {

    _commonFunction = CommonFunction;
    foodszoption = CommonFunction.clone(IBarStardard);
    foodjmoption = CommonFunction.clone(IBarStardard);
    hotelszoption = CommonFunction.clone(IBarStardard);
    hoteljmoption = CommonFunction.clone(IBarStardard);

    szoption = CommonFunction.clone(IScatter3DStardard);
    jmoption = CommonFunction.clone(IScatter3DStardard);

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.foodszoption.series[0].data = [104, 379, 535, 181, 47, 17];
        this.foodszoption.xAxis.data = ["20以下", "50以下", "100以下", "200以下", "500以下", "500以上"];
        this.foodjmoption.series[0].data = [246, 340, 303, 25, 2, 0];
        this.foodjmoption.xAxis.data = ["20以下", "50以下", "100以下", "200以下", "500以下", "500以上"];

        this.hotelszoption.series[0].data = [149, 679, 1685, 2263, 686, 441];
        this.hotelszoption.xAxis.data = ["50以下", "100以下", "200以下", "500以下", "1000以下", "1000以上"];
        this.hoteljmoption.series[0].data = [4, 117, 417, 208, 41, 70];
        this.hoteljmoption.xAxis.data = ["50以下", "100以下", "200以下", "500以下", "1000以下", "1000以上"];

        let spot_sz: Promise<SpotInfo[]> = this.http.get<SpotInfo[]>("assets/json/深圳市旅游景点信息.json").toPromise();
        let spot_jm: Promise<SpotInfo[]> = this.http.get<SpotInfo[]>("assets/json/江门市旅游景点信息.json").toPromise();

        spot_sz.then(
            r => {
                this.szoption.xAxis3D["name"] = "景色";
                this.szoption.yAxis3D["name"] = "趣味";
                this.szoption.zAxis3D["name"] = "性价比";
                this.szoption.series[0].data = r.filter(x => x.Scenery !== 0).map(y => [y.Scenery, y.Funny, y.PriceValue, y.ScoreCnt]);
                this.szoption.series[0].symbolSize = this.symbolSizeForPoint;
                this.szoption.visualMap[0].max = 400;
                this.char_szspot.setOption(this.szoption);
            }
        )
        spot_jm.then(
            r => {
                this.jmoption.xAxis3D["name"] = "景色";
                this.jmoption.yAxis3D["name"] = "趣味";
                this.jmoption.zAxis3D["name"] = "性价比";
                this.jmoption.series[0].data = r.filter(x => x.Scenery !== 0).map(y => [y.Scenery, y.Funny, y.PriceValue, y.ScoreCnt]);
                this.jmoption.series[0].symbolSize = this.symbolSizeForPoint;
                this.jmoption.visualMap[0].max = 400;
                this.char_jmspot.setOption(this.jmoption);
            }
        )
    }

    char_szspot;
    char_jmspot;
    GetSZSpotChart(c: any) {
        this.char_szspot = c;
    }
    GetJMSpotChart(c: any) {
        this.char_jmspot = c;
    }
    symbolSizeForPoint(val: any) {
        return Math.sqrt(val[3]);
    };
}