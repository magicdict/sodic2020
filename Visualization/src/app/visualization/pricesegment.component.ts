import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { IBarStardard } from '../Common/chartOption';

@Component({
    templateUrl: './pricesegment.component.html',
})
export class PirceSegementComponent implements OnInit{

    _commonFunction = CommonFunction;
    foodszoption = CommonFunction.clone(IBarStardard); 
    foodjmoption = CommonFunction.clone(IBarStardard); 
    hotelszoption = CommonFunction.clone(IBarStardard); 
    hoteljmoption = CommonFunction.clone(IBarStardard); 
    ngOnInit(): void {
        this.foodszoption.series[0].data=[104,379,535,181,47,17];
        this.foodszoption.xAxis.data = ["20以下","50以下","100以下","200以下","500以下","500以上"];
        this.foodjmoption.series[0].data=[246,340,303,25,2,0];
        this.foodjmoption.xAxis.data = ["20以下","50以下","100以下","200以下","500以下","500以上"];

        this.hotelszoption.series[0].data=[149,679,1685,2263,686,441];
        this.hotelszoption.xAxis.data = ["50以下","100以下","200以下","500以下","1000以下","1000以上"];
        this.hoteljmoption.series[0].data=[4,117,417,208,41,70];
        this.hoteljmoption.xAxis.data = ["50以下","100以下","200以下","500以下","1000以下","1000以上"];


    }
}