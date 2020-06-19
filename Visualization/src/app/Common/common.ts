import { Injectable } from '@angular/core';
import { echartsInstance } from 'echarts'
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

export interface NameValueSet {
    Name: string,
    Value: number
}

@Injectable()
export class CommonFunction {

    constructor(
        private http: HttpClient
    ) { }

    public static boxstyle_mini = { 'width': '250px', 'height': '150px' };
    public static chartstyle_mini = { 'width': '240px', 'height': '140px' };

    public static boxstyle_Col3 = { 'width': '380px', 'height': '400px' };
    public static chartstyle_Col3 = { 'width': '340px', 'height': '350px' };

    public static boxstyle_Col4 = { 'width': '500px', 'height': '400px' };
    public static chartstyle_Col4 = { 'width': '450px', 'height': '350px' };

    public static boxstyle_Col4_Row2 = { 'width': '500px', 'height': '820px' };
    public static chartstyle_Col4_Row2 = { 'width': '450px', 'height': '770px' };


    public static boxstyle_Col6 = { 'width': '800px', 'height': '400px' };
    public static chartstyle_Col6 = { 'width': '750px', 'height': '350px' };
    public static boxstyle_Col6_Row2 = { 'width': '800px', 'height': '820px' };
    public static chartstyle_Col6_Row2 = { 'width': '750px', 'height': '770px' };

    public static boxstyle_Col8 = { 'width': '1000px', 'height': '400px' };
    public static chartstyle_Col8 = { 'width': '950px', 'height': '350px' };

    public static boxstyle_Col8_Row2 = { 'width': '1000px', 'height': '820px' };
    public static chartstyle_Col8_Row2 = { 'width': '950px', 'height': '770px' };

    public static boxstyle_Col9 = { 'width': '1220px', 'height': '400px' };
    public static chartstyle_Col9 = { 'width': '1170px', 'height': '350px' };

    public static boxstyle_Col12 = { 'width': '1600px', 'height': '400px' };
    public static chartstyle_Col12 = { 'width': '1550px', 'height': '350px' };

    public static boxstyle_Col12_Row2 = { 'width': '1600px', 'height': '820px' };
    public static chartstyle_Col12_Row2 = { 'width': '1550px', 'height': '770px' };

    public static boxstyle_Col12_Row3 = { 'width': '1600px', 'height': '1230px' };
    public static chartstyle_Col12_Row3 = { 'width': '1580px', 'height': '1160px' };

    public static GetWeatherImageByText(text: string): string {
        if (CommonFunction.IsNullOrEmpty(text)) { return "assets/image/weathy/weathy_01.png" }
        if (text === "阴") {
            return "assets/image/weathy/weathy_02.png"
        }
        if (text === "多云") {
            return "assets/image/weathy/weathy_03.png"
        }
        if (text === "阵雨") {
            return "assets/image/weathy/weathy_08.png"
        }
        if (text === "雨") {
            return "assets/image/weathy/weathy_08.png"
        }
        if (text.endsWith("小雨")) {
            return "assets/image/weathy/weathy_07.png"
        }
        if (text.endsWith("中雨")) {
            return "assets/image/weathy/weathy_08.png"
        }
        if (text.endsWith("大雨")) {
            return "assets/image/weathy/weathy_09.png"
        }
        if (text === "雪") {
            return "assets/image/weathy/weathy_12.png"
        }
        if (text.endsWith("小雪")) {
            return "assets/image/weathy/weathy_11.png"
        }
        if (text.endsWith("中雪")) {
            return "assets/image/weathy/weathy_12.png"
        }
        if (text.endsWith("大雪")) {
            return "assets/image/weathy/weathy_13.png"
        }
        return "assets/image/weathy/weathy_01.png";
    }

    public static getImage(weather: string) {
        if (weather == "多云") return '{cloudy|}';
        if (weather == "大雨") return '{bigrain|}';
        if (weather == "雷阵雨") return '{thunderstorm|}'
        if (weather == "阵雨") return '{rain|}'
        if (weather == "中到大雨") return '{rain|}'
        if (weather == "小到中雨") return '{rain|}'
        if (weather == "中雨") return '{rain|}'

        if (weather == "大暴雨") return '{greatrain|}'
        if (weather == "暴雨") return '{greatrain|}'
        if (weather == "大到暴雨") return '{greatrain|}'


        return weather;
    }

    /* 工具类 */
    public static checkNumbericRanger(text: string, max: number, min: number): number {
        if (CommonFunction.IsNullOrEmpty(text)) { return NaN; }
        const num = Number(text);
        if (isNaN(num)) { return NaN; }
        if (num > max || num < min) {
            return NaN;
        }
        return num;
    }


    /** 字符串是否为空（或空字符串）*/
    public static IsNullOrEmpty(text: string) {
        if (text === undefined) { return true; }
        if (text === null) { return true; }
        if (text === '') { return true; }
        return false;
    }

    /** 0.00 格式 */
    public static FormatNumberTwoDecimal(num: number) {
        let str = num.toString();
        if (str.indexOf('.') === -1) {
            str = str + '.00';
        }
        if (str.indexOf('.') === str.length - 2) {
            str = str + '0';
        }
        return str;
    }

    /** 0.0 格式 */
    public static FormatNumberOneDecimal(num: number) {
        let str = num.toString();
        if (str.indexOf('.') === -1) {
            str = str + '.0';
        }
        return str;
    }

    /** 四舍五入（保留两位小数） */
    public static roundvalue(num: number): number {
        let number: number;
        number = Math.round(num * 100);
        number = number / 100;
        return number;
    }

    /**克隆 */
    public static clone<T>(source: T): T {
        return (JSON.parse(JSON.stringify(source)));
    }


    public static NumberSortMethod = (n1: number, n2: number) => {
        if (n1 > n2) {
            return 1;
        }

        if (n1 < n2) {
            return -1;
        }

        return 0;
    };

    public static ConvertNumberToWeekday(week: number): string {
        switch (week) {
            case 0:
                return "日";
            case 1:
                return "一";
            case 2:
                return "二";
            case 3:
                return "三";
            case 4:
                return "四";
            case 5:
                return "五";
            case 6:
                return "六";
            default:
                return "六";
        }
    }
    public beautiful(opt: any) {
        opt.series[0]['itemStyle'] = //定义每个bar的颜色和其上是否显示值
        {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#60ACFC'
                }, {
                    offset: 1,
                    color: '#32D3EB'
                }]),
                opacity: 0.75,
                label: {
                    color: '#9287E7',
                    //每个bar的最高点值显示在bar顶部
                    show: true,
                    position: 'top',
                    //值和x轴分类的显示格式(这里是换行显示)
                    formatter: '{c}'
                }
            }
        }
    }
    public static SaveChartImage(chartInstannce: echartsInstance, filename: string) {
        var img = new Image();
        img.src = chartInstannce.getDataURL({
            pixelRatio: 2,
            backgroundColor: '#fff'
        });
        // IE 11
        if (window.navigator.msSaveBlob !== undefined) {
            var blob = CommonFunction.base64ToBlob(img.src);
            window.navigator.msSaveBlob(blob, filename + '.png');
            return;
        }
        var a = document.createElement('a');
        a.download = filename;
        a.href = img.src;
        var event = new MouseEvent('click');
        a.dispatchEvent(event);
    }


    private static base64ToBlob(code: string): Blob {
        const parts = code.split(';base64,');
        const contentType = parts[0].split(':')[1];
        const raw = window.atob(parts[1]);
        const rawLength = raw.length;
        const uInt8Array = new Uint8Array(rawLength);
        for (let i = 0; i < rawLength; ++i) {
            uInt8Array[i] = raw.charCodeAt(i);
        }
        return new Blob([uInt8Array], { type: contentType });
    }


    public static pred(arr: number[]): number {

        if (arr.length == 0) return 0;
        if (arr.length == 1) return arr[0];
        let sum = 0;
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        };
        var avg_num = Math.ceil(sum / arr.length);
        var last_num = arr[arr.length - 1];
        var last_2_num = arr[arr.length - 2];
        var diff = last_2_num - last_num
        var diff_pred = last_num - diff
        return this.roundvalue(avg_num * 0.2 + last_num * 0.2 + diff_pred * 0.6);
    }

    public static Fill3DTime(ds: NameValueSet[], chart: any, zname: string, max: number = -1) {
        //X:具体时间，Y：日期，Z：流量
        var weekday = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
        var time = [];
        ds.forEach(
            element => {
                var t = element.Name.split("|")[1];
                if (time.indexOf(t) == -1) time.push(t);
            }
        );
        time = time.sort();
        chart.zAxis3D.name = zname;
        chart.xAxis3D.data = time;
        chart.yAxis3D.data = weekday;
        //三维数组
        var data: any[] = [];
        ds.forEach(element => {
            data.push([element.Name.split("|")[1], this.ConvertIntToWeekday(element.Name.split("|")[0]), element.Value]);
        });

        chart.series[0].data = data;
        let x = ds.map(x => x.Value);
        chart.visualMap.max = max === -1 ? Math.max(...x) : max;
        chart.grid3D.boxWidth = 200;
        chart.grid3D.boxDepth = 80;
        chart.grid3D["height"] = 750;
    }


    public static ConvertIntToWeekday(weekday: any) {
        switch (weekday) {
            case "0": return "周日";
            case "1": return "周一";
            case "2": return "周二";
            case "3": return "周三";
            case "4": return "周四";
            case "5": return "周五";
            case "6": return "周六";
        }
    }


    private webapiurl = "http://39.105.206.6:8080/";
    //private webapiurl = "http://localhost:5000/";

    public httpRequestGet<T>(serviceUrl: string): Promise<T> {
        return this.http.get(
            this.webapiurl + serviceUrl
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }


    public httpRequestGetFromAsset<T>(serviceUrl: string): Promise<T> {
        return this.http.get(
            "/assets/" + serviceUrl
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }

    public httpRequestGetFromAssetAsXml(serviceUrl: string): Promise<any> {
        return this.http.get(
            "/assets/" + serviceUrl,
            { responseType: 'text' }
        )
            .toPromise()
            .then(response => {
                return response;
            })
            .catch(this.handleError);
    }

    public httpRequestPost<T>(serviceUrl: string, params: any = {}): Promise<T> {
        return this.http.post(
            this.webapiurl + serviceUrl,
            params
        )
            .toPromise()
            .then(response => {
                return response as T;
            })
            .catch(this.handleError);
    }

    handleError(error: any): Promise<any> {
        //console.log('服务器访问失败');
        console.error('服务器访问失败', error);
        return Promise.reject(error.message || error);
    }
}

