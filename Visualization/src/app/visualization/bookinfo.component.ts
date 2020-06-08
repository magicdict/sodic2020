import { CommonFunction } from '../Common/common';
import { IBarStardard, IPieStardard, I3DBarStardard } from '../Common/chartOption';
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
    netrateoption = CommonFunction.clone(IBarStardard);
    realtimeoption = CommonFunction.clone(I3DBarStardard);

    hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
    spot = ['太阳广场', '月亮广场', '愿望塔',
        '阳光走廊', '月光花园', '“天长地久”礁石', '观光栈道'];

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

                this.netrateoption.series[0].data = r.map(x => x.OnlineBook / x.TotalBook);
                this.netrateoption.xAxis.data = r.map(x => this.convertData(x.Date));
                this.dmsnetratechart.setOption(this.netrateoption);

                r = r.sort((x, y) => y.InCount - x.InCount);
                let Top10 = r.slice(0, 10);
                this.top10option.series[0].data = Top10.map(x => x.InCount);
                this.top10option.xAxis.data = Top10.map(x => this.convertData(x.Date));
                this.top10option.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
                this.dmsweekdaychart_top10.setOption(this.top10option);

                //杜撰数据
                this.realtimeoption.xAxis3D.data = this.hours;
                this.realtimeoption.yAxis3D.name = "地点";
                this.realtimeoption.yAxis3D.data = this.spot;
                this.realtimeoption.visualMap.max = 1000;
                for (let time = 0; time < this.hours.length - 7; time++) {
                    for (let spot = 0; spot < this.spot.length; spot++) {
                        this.realtimeoption.series[0].data.push([time, spot, Math.round(Math.random() * 1000)]);
                    }
                }
                this.realtimeoption.series[0].emphasis.label.formatter = this.realtimeformat;
                this.realtimechart.setOption(this.realtimeoption);
            }
        );
    }

    realtimeformat(val:any){
        let hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'];
        let spot = ['太阳广场', '月亮广场', '愿望塔',
        '阳光走廊', '月光花园', '“天长地久”礁石', '观光栈道'];
        return "时间：" +  hours[val.value[0]] + '\n地点：' + spot[val.value[1]] + "\n客流：" + val.value[2];
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

    dmsnetratechart;
    GetDMSNetRate(c: any) {
        this.dmsnetratechart = c;
    }


    realtimechart;
    GetRealTime(c: any) {
        this.realtimechart = c;
    }
}