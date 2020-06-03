import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { IBarStardard } from '../Common/chartOption';
import { SearchKey } from '../Modal';

@Component({
    templateUrl: './searchkey.component.html',
})
export class SearchKeyComponent implements OnInit {

    _commonFunction = CommonFunction;
    foodoption = CommonFunction.clone(IBarStardard);
    hoteloption = CommonFunction.clone(IBarStardard);
    spotoption = CommonFunction.clone(IBarStardard);

    constructor(private common: CommonFunction) { }

    ngOnInit(): void {
        let dict: Promise<SearchKey> = this.common.httpRequestGet("search/GetSearchKey");
        dict.then(
            r => {
                r.Spot = r.Spot.slice(0, 10);
                r.Food = r.Food.slice(0, 10);
                r.Hotel = r.Hotel.slice(0, 10);
                this.spotoption.xAxis.data = r.Spot.map(x => x.name);
                this.spotoption.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
                this.spotoption['grid'] = { bottom : 150 };
                this.spotoption.series[0].data = r.Spot.map(x => x.value);
                this.char_spot.setOption(this.spotoption);

                this.foodoption.xAxis.data = r.Food.map(x => x.name);
                this.foodoption.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
                this.foodoption['grid'] = { bottom : 150 };
                this.foodoption.series[0].data = r.Food.map(x => x.value);
                this.char_food.setOption(this.foodoption);

                this.hoteloption.xAxis.data = r.Hotel.map(x => x.name);
                this.hoteloption.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
                this.hoteloption['grid'] = { bottom : 150 };
                this.hoteloption.series[0].data = r.Hotel.map(x => x.value);
                this.char_hotel.setOption(this.hoteloption);
            }
        )
    }

    char_spot;
    char_food;
    char_hotel;
    GetSpotChart(c: any) {
        this.char_spot = c;
    }
    GetFoodChart(c: any) {
        this.char_food = c;
    }
    GetHotelChart(c: any) {
        this.char_hotel = c;
    };
}