import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { DataStorage } from './datastorage';
import { CommonFunction } from './common';


@Injectable()
export class AppService {

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //用户数据

    /**收藏夹 */
    FavItem: any[] = [];
    AddToFav(item: any, type: enmItemType) {
        item["ItemType"] = type;
        this.FavItem.push(item);
        this.localstorage.Save("FavItem", this.FavItem);
    }

    /**出行计划 */
    Plan: PlanInfo;
    CurrentDailyInfo: DailyInfo;
    DelFormPlan(itemname: string) {
        this.CurrentDailyInfo.Spot = this.CurrentDailyInfo.Spot.filter(x => x.Name !== itemname);
        this.CurrentDailyInfo.Food = this.CurrentDailyInfo.Food.filter(x => x.Name !== itemname);
        if (this.CurrentDailyInfo.Hotel.Name === itemname) this.CurrentDailyInfo.Hotel = null;
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
    SpotList_GradeAOnly: SpotInfo[] = [];

    FoodList_CurrentShow: FoodInfo[] = [];
    FoodList_Hot: FoodInfo[] = [];

    HotelList_CurrentShow: HotelInfo[] = [];
    HotelList_Hot: HotelInfo[] = [];

    TourList: TourInfo[] = [];
    GiftList: GiftInfo[] = [];

    constructor(private http: HttpClient, private localstorage: DataStorage, private common: CommonFunction) {
        //用户数据的载入
        this.FavItem = this.localstorage.Load("FavItem");
        if (this.FavItem === null) this.FavItem = [];
        console.log("Fav Spot Name List:" + this.FavItem);
        this.Plan = this.localstorage.Load("Plan");
        console.log("User Plan:" + this.Plan);

        let spot_gradeA = this.http.get("assets/json/A级旅游景点评价信息.json").toPromise().then(x => x as SpotInfo[]);
        spot_gradeA.then(
            r => {
                this.SpotList_GradeAOnly = r;
                this.SpotList_CurrentShow = r;
                this.IsLoadSpotFinished = true;
                this.loadMsg = "[完成]A级旅游景点评价信息";
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

    /**根据名字获得美食信息 */
    GetFoodInfoByName(name: string): FoodInfo {
        let x = this.FoodList_CurrentShow.find(x => this.EncodeURI(x.Name) === name);
        return x;
    }

    /**美食检索 */
    SearchFood(key: string): Promise<FoodInfo[]> {
        return this.common.httpRequestGet<FoodInfo[]>("search/SearchFood?key=" + key);
    }

    /**根据名字获得美食信息 */
    GetHotelInfoByName(name: string): HotelInfo {
        let x = this.HotelList_CurrentShow.find(x => this.EncodeURI(x.Name) === name);
        if (x !== undefined) return x;
        //WebApi
    }

    /**酒店检索 */
    SearchHotel(key: string): Promise<HotelInfo[]> {
        return this.common.httpRequestGet<HotelInfo[]>("search/SearchHotel?key=" + key);
    }
}

/**景区 */
export interface SpotInfo {
    Name: string;
    Type: string;
    ALevel: string;
    Address: string;
    Description: string;
    Price: number;
    OpenTime: number;
    ServiceTel: number;
    IssueTel: number;
    TrafficGuide: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
    WordCloud: { name: string, value: number }[]
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
    WordCloud: { name: string, value: number }[]
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
    Spot: SpotInfo[];
    Food: FoodInfo[];
    Hotel: HotelInfo;
}