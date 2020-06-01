import { CommonFunction } from '../Common/common';
import { IBarStardard, IPieStardard } from '../Common/chartOption';
import { BigMeiShaBook } from '../Modal';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './bookinfo.component.html',
})
export class BookInfoComponent implements OnInit {
    constructor(private http: HttpClient) { }
    _commonFunction = CommonFunction;
    dmsweekdayoption = CommonFunction.clone(IPieStardard);
    dmsweekdayoption_incount = CommonFunction.clone(IPieStardard);
    top10option = CommonFunction.clone(IBarStardard);
    ngOnInit(): void {
        let dms: Promise<BigMeiShaBook[]> = this.http.get<BigMeiShaBook[]>("assets/json/大梅沙预约数据.json").toPromise();
        dms.then(
            r => {
                r = r.filter(x => x.InCount > 100);
                for (let weekday = 0; weekday < 7; weekday++) {
                    let c = r.filter(x => x.WeekDay === weekday);
                    let avg = this.avg(c.map(x => x.TotalBook));
                    this.dmsweekdayoption.legend.data.push(CommonFunction.ConvertNumberToWeekday(weekday));
                    this.dmsweekdayoption.series[0].data.push({ 'name': CommonFunction.ConvertNumberToWeekday(weekday), value: avg });
                }
                this.dmsweekdaychart.setOption(this.dmsweekdayoption)
                for (let weekday = 0; weekday < 7; weekday++) {
                    let c = r.filter(x => x.WeekDay === weekday);
                    let avg = this.avg(c.map(x => x.InCount));
                    this.dmsweekdayoption_incount.legend.data.push(CommonFunction.ConvertNumberToWeekday(weekday));
                    this.dmsweekdayoption_incount.series[0].data.push({ 'name': CommonFunction.ConvertNumberToWeekday(weekday), value: avg });
                }
                this.dmsweekdaychart_incount.setOption(this.dmsweekdayoption_incount)

                r = r.sort((x, y) => y.InCount - x.InCount);
                let Top10 = r.slice(0, 10);
                this.top10option.series[0].data = Top10.map(x => x.InCount);
                this.top10option.xAxis.data = Top10.map(x => this.convertData(x.Date));
                this.top10option.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
                this.dmsweekdaychart_top10.setOption(this.top10option)
            }
        );
    }

    convertData(x: Date): string {
        let d = new Date(x);
        return d.toLocaleDateString();
    }

    avg(arr: number[]): number {
        let sum: number = 0;
        arr.forEach(element => {
            sum += element;
        });
        return Math.round(sum / arr.length);
    }

    dmsweekdaychart;
    GetDMSWeekChart(c: any) {
        this.dmsweekdaychart = c;
    }

    dmsweekdaychart_incount;
    GetDMSWeekChart_InCount(c: any) {
        this.dmsweekdaychart_incount = c;
    }

    dmsweekdaychart_top10;
    GetDMSWeekChart_Top10(c: any) {
        this.dmsweekdaychart_top10 = c;
    }
}