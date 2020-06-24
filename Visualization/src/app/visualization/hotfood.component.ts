import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { IBarStardard } from '../Common/chartOption';
import * as echarts from 'echarts';

@Component({
    templateUrl: './hotfood.component.html',
})
export class HotfoodComponent implements OnInit {
    constructor(private common: CommonFunction) { }
    _commonFunction = CommonFunction;
    foodszoption = CommonFunction.clone(IBarStardard);
    foodjmoption = CommonFunction.clone(IBarStardard);


    szfoodlist: string[] = ["炸腐竹", "干炒牛河", "苏丹王黄金果肉榴莲比萨", "手撕包菜", "农家小炒肉", "湿炒牛河", "三文鱼刺身", "金针菇", "酸菜鱼", "鸡米花", "夫妻肺片", "胸口油", "超级豪华比萨", "小炒黄牛肉", "新奥尔良烤翅", "羊肉串", "烤鸡翅", "榴莲多多比萨", "肥牛", "新奥尔良烤鸡肉比萨"];
    jmfoodlist: string[] = ["黄鳝饭", "金针菇", "酸菜鱼", "肥牛", "鸡米花", "杂菜", "咖喱鱼蛋", "薯条", "蛋挞", "葡挞", "扬州炒饭", "焖鹅", "香辣鸡翅", "金桔柠檬", "卡布奇诺", "三文鱼刺身", "凉拌青瓜", "烧鹅", "五味鹅", "骨肉相连"];

    ngOnInit(): void {

        this.foodszoption.series[0].data = [38, 37, 37, 33, 31, 29, 28, 28, 26, 25, 23, 23, 22, 22, 21, 21, 20, 20, 20, 20];
        this.foodszoption.xAxis.data = this.szfoodlist;
        this.foodszoption.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
        this.foodszoption["grid"] = { top: 20, bottom: 150 };
        this.common.beautiful(this.foodszoption);


        this.foodjmoption.series[0].data = [16, 15, 13, 12, 12, 12, 12, 12, 12, 11, 11, 11, 10, 10, 10, 9, 9, 9, 9, 9];
        this.foodjmoption.xAxis.data = this.jmfoodlist;
        this.foodjmoption.xAxis["axisLabel"] = { interval: 0, rotate: 45 }
        this.foodjmoption["grid"] = { top: 20, bottom: 150 };
        this.common.beautiful(this.foodjmoption);

        this.foodszoption.series[0]['itemStyle']['normal']['color'] = this.setcolor;
        this.foodjmoption.series[0]['itemStyle']['normal']['color'] = this.setcolor;

    }

    setcolor(params: any) {
        console.log(params.name);
        let IsInTwo = false;
        //闭包，this指向图表。。。
        let szfoodlist: string[] = ["炸腐竹", "干炒牛河", "苏丹王黄金果肉榴莲比萨", "手撕包菜", "农家小炒肉", "湿炒牛河", "三文鱼刺身", "金针菇", "酸菜鱼", "鸡米花", "夫妻肺片", "胸口油", "超级豪华比萨", "小炒黄牛肉", "新奥尔良烤翅", "羊肉串", "烤鸡翅", "榴莲多多比萨", "肥牛", "新奥尔良烤鸡肉比萨"];
        let jmfoodlist: string[] = ["黄鳝饭", "金针菇", "酸菜鱼", "肥牛", "鸡米花", "杂菜", "咖喱鱼蛋", "薯条", "蛋挞", "葡挞", "扬州炒饭", "焖鹅", "香辣鸡翅", "金桔柠檬", "卡布奇诺", "三文鱼刺身", "凉拌青瓜", "烧鹅", "五味鹅", "骨肉相连"];
        IsInTwo = (szfoodlist.indexOf(params.name) !== -1 && jmfoodlist.indexOf(params.name) !== -1)
        if (IsInTwo) {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FEB64D'
            }, {
                offset: 1,
                color: '#FF7C7C'
            }])
        } else {
            return new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#60ACFC'
            }, {
                offset: 1,
                color: '#32D3EB'
            }])
        }
    }
}