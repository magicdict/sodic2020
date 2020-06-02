import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { DataStorage } from './datastorage';
import { CommonFunction } from './common';
import { SelectItem } from 'primeng/api/selectitem';
declare var BMap: any;

@Injectable()
export class AppService {

    static myposition: { lat: number, lng: number; } = { lat: -1, lng: -1 };

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //用户数据

    RefreshGeo() {
        let BMAP_STATUS_SUCCESS = 0;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function (r) {
            if (this.getStatus() === BMAP_STATUS_SUCCESS) {
                var lat = r.point.lat//当前经度
                var lng = r.point.lng//当前纬度
                var province = r.address.province //返回当前省份
                var city = r.address.city//返回当前城市
                AppService.myposition = { lat: lat, lng: lng };
                console.log(AppService.myposition);
            }
        })
    }
    distanceByLnglat(lng1, lat1, lng2, lat2): string {
        var radLat1 = this.Rad(lat1);
        var radLat2 = this.Rad(lat2);
        var a = radLat1 - radLat2;
        var b = this.Rad(lng1) - this.Rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * 6378137.0; // 取WGS84标准参考椭球中的地球长半径(单位:m)
        s = Math.round(s * 10000) / 10000;
        return this.formatdistence(s);
    }
    Rad(d) {
        return d * Math.PI / 180.0;
    }
    formatdistence(s: number): string {
        if (s > 1000) return String(Math.round(s / 1000)) + "公里"
        return String(Math.round(s)) + "米"
    }
    /**收藏夹 */
    favorites: any[] = [];
    AddToFav(item: any, type: enmItemType) {
        item["ItemType"] = type;
        if (this.favorites.find(x => x.Name === item.Name) !== undefined) return;
        this.favorites.push(item);
        this.localstorage.Save("favorites", this.favorites);
    }

    DelFromFav(itemname) {
        this.favorites = this.favorites.filter(x => x.Name !== itemname);
        this.localstorage.Save("favorites", this.favorites);
    }

    footprints: FootprintItem[] = [];
    AddToFootprint(item: FootprintItem) {
        this.footprints.push(item);
        this.localstorage.Save("footprints", this.footprints);
    }
    DelFromFootprint(item: FootprintItem) {
        console.log(item.Datetime.toString());
        this.footprints = this.footprints.filter(x => x.Datetime.toString() !== item.Datetime.toString());
        this.localstorage.Save("footprints", this.footprints);
    }

    /**出行计划 */
    Plan: PlanInfo;
    CurrentDailyInfo: DailyInfo;
    DelFormPlan(itemname: string) {
        this.CurrentDailyInfo.Spot = this.CurrentDailyInfo.Spot.filter(x => x.Name !== itemname);
        this.CurrentDailyInfo.Food = this.CurrentDailyInfo.Food.filter(x => x.Name !== itemname);
        if (this.CurrentDailyInfo.Hotel !== null && this.CurrentDailyInfo.Hotel.Name === itemname) this.CurrentDailyInfo.Hotel = null;
        this.localstorage.Save("Plan", this.Plan);
    }
    AddToPlan(item: any, type: enmItemType) {
        if (type === enmItemType.Food) this.CurrentDailyInfo.Food.push(item);
        if (type === enmItemType.Spot) this.CurrentDailyInfo.Spot.push(item);
        if (type === enmItemType.Hotel) this.CurrentDailyInfo.Hotel = item;
        this.localstorage.Save("Plan", this.Plan);
    }

    IsAddToPlanMode: boolean = false;

    //系统数据
    IsLoadSpotFinished = false;
    IsLoadFoodFinished = false;
    IsLoadHotelFinished = false;
    IsLoadTourFinished = false;
    IsLoadGiftFinished = false;
    get IsLoadFinish() {
        return this.IsLoadFoodFinished && this.IsLoadSpotFinished && this.IsLoadHotelFinished && this.IsLoadTourFinished && this.IsLoadGiftFinished;
    }
    loadMsg = "";

    SpotList_CurrentShow: SpotInfo[] = [];
    SpotList_GradeA: SpotInfo[] = [];
    SpotList_Red: SpotInfo[] = [];
    SpotList_Cult: SpotInfo[] = [];
    SpotList_Relax: SpotInfo[] = [];
    SpotList_Child: SpotInfo[] = [];

    FoodList_CurrentShow: FoodInfo[] = [];
    FoodList_Hot: FoodInfo[] = [];

    HotelList_CurrentShow: HotelInfo[] = [];
    HotelList_Hot: HotelInfo[] = [];

    TourList: TourInfo[] = [];
    GiftList: GiftInfo[] = [];

    public InitScene() {
        this.scenemgr.lineIdx = 0;
        this.scenemgr.sceneName = "菜单";
    }

    constructor(private http: HttpClient, private localstorage: DataStorage, public scenemgr: SceneMgr, private common: CommonFunction) {
        //用户数据的载入
        this.favorites = this.localstorage.Load("favorites");
        this.footprints = this.localstorage.Load("footprints");
        if (this.favorites === null) { this.favorites = []; this.localstorage.Save("favorites", this.favorites); }
        if (this.footprints === null) { this.footprints = []; this.localstorage.Save("footprints", this.footprints); }
        console.log("Fav Spot Name List:" + this.favorites);
        this.Plan = this.localstorage.Load("Plan");
        console.log("User Plan:" + this.Plan);

        let spot_gradeA = this.http.get("assets/json/旅游景点信息.json").toPromise().then(x => x as SpotInfo[]);
        spot_gradeA.then(
            r => {
                this.SpotList_GradeA = r.filter(x => x.ALevel.length !== 0);;
                this.SpotList_Red = r.filter(x => x.Type.indexOf("红色") !== -1);
                this.SpotList_Cult = r.filter(x => x.Type.indexOf("文化") !== -1);
                this.SpotList_Relax = r.filter(x => x.Type.indexOf("休闲") !== -1);
                this.SpotList_Child = r.filter(x => x.Type.indexOf("亲子") !== -1);
                this.SpotList_CurrentShow = this.SpotList_GradeA;
                this.IsLoadSpotFinished = true;
                this.loadMsg = "[完成]旅游景点信息";
            }
        )

        let food = this.http.get("assets/json/热门特色美食信息.json").toPromise().then(x => x as FoodInfo[]);
        food.then(
            r => {
                this.FoodList_Hot = r;
                this.FoodList_CurrentShow = r;
                this.IsLoadFoodFinished = true;
                this.loadMsg = "[完成]热门特色美食信息";

            }
        )

        let hotel = this.http.get("assets/json/热门宾馆酒店信息.json").toPromise().then(x => x as HotelInfo[]);
        hotel.then(
            r => {
                this.HotelList_Hot = r;
                this.HotelList_CurrentShow = r;
                this.IsLoadHotelFinished = true;
                this.loadMsg = "[完成]热门宾馆酒店信息";
            }
        )

        let tour = this.http.get("assets/json/旅游目的地包团信息.json").toPromise().then(x => x as TourInfo[]);
        tour.then(
            r => {
                this.TourList = r;
                this.IsLoadTourFinished = true;
                this.loadMsg = "[完成]旅游目的地包团信息";
            }
        )

        let gift = this.http.get("assets/json/地方特产信息.json").toPromise().then(x => x as TourInfo[]);
        gift.then(
            r => {
                this.GiftList = r;
                this.IsLoadGiftFinished = true;
                this.loadMsg = "[完成]地方特产信息";
            }
        )
        this.RefreshGeo();
        this.InitScene();
    }



    EncodeURI(url: string): string {
        url = url.replace("(", "");
        url = url.replace(")", "");
        return url;
    }

    /**根据名字获得景点信息 */
    GetSpotInfoByName(name: string): SpotInfo {
        let x = this.SpotList_CurrentShow.find(x => this.EncodeURI(x.Name) === name);
        return x;
    }

    /**景点检索 */
    SearchSpot(key: string): Promise<SpotInfo[]> {
        return this.common.httpRequestGet<SpotInfo[]>("search/SearchSpot?key=" + key);
    }


    /**美食检索 */
    SearchFood(key: string): Promise<FoodInfo[]> {
        return this.common.httpRequestGet<FoodInfo[]>("search/SearchFood?key=" + key);
    }

    /**酒店检索 */
    SearchHotel(key: string): Promise<HotelInfo[]> {
        return this.common.httpRequestGet<HotelInfo[]>("search/SearchHotel?key=" + key);
    }

    CitySelect: SelectItem[] = [{ label: '深圳', value: '深圳市' }, { label: '江门', value: '江门市' }];

}


/**景区 */
export interface SpotInfo {
    Name: string;
    Type: string;
    ALevel: string;
    Address: string;
    Description: string;
    Price: number;
    OpenTime: string;
    ServiceTel: string;
    IssueTel: string;
    TrafficGuide: string;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[];
    City: string;
    ScoreCnt: number;
    Scenery: number;
    Funny: number;
    PriceValue: number;
    NearFood: { Item1: string, Item2: number, Item3: string }[];
    NearHotel: { Item1: string, Item2: number, Item3: string }[];
}

/**美食 */
export interface FoodInfo {
    Name: string;
    Address: string;
    Item: string[];
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[];
    City: string;
}

/**宾馆酒店 */
export interface HotelInfo {
    Name: string;
    Grade: string;
    Distract: string;
    Address: string;
    Description: string;
    ServiceTel: string;
    ServiceFax: string;
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[],
    Score: number;
    City: string;
}

export interface TourInfo {
    Name: string;
    Price: number;
    Description: string;
    Days: string;
}

export interface GiftInfo {
    Name: string;
    Description: string;
}

export enum enmItemType {
    Spot, Food, Hotel, Gift
}

export interface PlanInfo {
    StartDate: Date;
    EndDate: Date;
    Daily: DailyInfo[];
}

export interface DailyInfo {
    strDate: string;
    strWeek: string;
    citys: string[];
    CompanyWith: string;
    Spot: SpotInfo[];
    Food: FoodInfo[];
    Hotel: HotelInfo;
}

export interface FootprintItem {
    Title: string;
    Address: string;
    Src: string;
    Datetime: string;
    Description: string;
    Rotate: string;
}

import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SceneMgr } from './SceneMgr';

@Injectable()
export class IFoodInfoResolver implements Resolve<FoodInfo> {
    constructor(private homeservice: AppService, public commonFunction: CommonFunction) {

    }
    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): FoodInfo | Observable<FoodInfo> | Promise<FoodInfo> {
        let name = route.paramMap.get('name');
        let x = this.homeservice.FoodList_CurrentShow.find(x => this.homeservice.EncodeURI(x.Name) === name);
        if (x != undefined) return x;
        return this.commonFunction.httpRequestGet<FoodInfo>("search/GetFoodByName?Name=" + name);
    }
}

@Injectable()
export class IHotelInfoResolver implements Resolve<HotelInfo> {
    constructor(private homeservice: AppService, public commonFunction: CommonFunction) {

    }
    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): HotelInfo | Observable<HotelInfo> | Promise<HotelInfo> {
        let name = route.paramMap.get('name');
        let x = this.homeservice.HotelList_CurrentShow.find(x => this.homeservice.EncodeURI(x.Name) === name);
        if (x != undefined) return x;
        return this.commonFunction.httpRequestGet<HotelInfo>("search/GetHotelByName?Name=" + name);
    }
}