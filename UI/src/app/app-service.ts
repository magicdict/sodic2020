import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { DataStorage } from './datastorage';


@Injectable()
export class AppService {

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    //用户收藏
    FavSpotName: string[] = [];

    AddToFav(name: string) {
        if (this.FavSpotName.find(x => x === name) === undefined) this.FavSpotName.push(name);
        this.localstorage.Save("FavSpotName", this.FavSpotName);
    }


    //系统数据
    IsLoadSpotFinished = false;
    IsLoadFoodFinished = false;

    get IsLoadFinish(){
        return this.IsLoadFoodFinished && this.IsLoadSpotFinished;
    }

    SpotList_GradeAOnly: SpotInfo[] = [];
    FoodList_Hot: FoodInfo[] = [];

    HotelList_SZ: HotelInfo[] = [];
    HotelList_JM: HotelInfo[] = [];
    HotelList_RankStarOnly: HotelInfo[] = [];

    constructor(public http: HttpClient, public localstorage: DataStorage) {
        //用户数据的载入
        this.FavSpotName = this.localstorage.Load("FavSpotName");
        if (this.FavSpotName === null) this.FavSpotName = [];
        console.log("Fav Spot Name List:" + this.FavSpotName);


        let spot_gradeA = this.http.get("assets/json/A级旅游景点评价信息.json").toPromise().then(x => x as SpotInfo[]);
        spot_gradeA.then(
            r => {
                this.SpotList_GradeAOnly = r;
                this.IsLoadSpotFinished = true;
            }
        )

        let food_sz = this.http.get("assets/json/热门特色美食信息.json").toPromise().then(x => x as FoodInfo[]);
        food_sz.then(
            r => {
                this.FoodList_Hot = r;
                this.IsLoadFoodFinished = true;
            }
        )
        return;

        //酒店宾馆
        let hotel_sz = this.http.get("assets/json/深圳市宾馆酒店信息.json").toPromise().then(x => x as HotelInfo[]);
        hotel_sz.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.Price - x.Price });
                this.HotelList_SZ = r;
                r.forEach(element => {
                    if (element.Grade.startsWith("国家旅游局评定为")) {
                        element.Grade = element.Grade.substr("国家旅游局评定为".length)
                        this.HotelList_RankStarOnly.push(element);
                    }
                });
                console.log("Load 深圳市宾馆酒店简化信息:" + r.length);
            }
        )

        let hotel_jm = this.http.get("assets/json/江门市宾馆酒店信息.json").toPromise().then(x => x as HotelInfo[]);
        hotel_jm.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.Price - x.Price });
                this.HotelList_JM = r;
                r.forEach(element => {
                    if (element.Grade.startsWith("国家旅游局评定为")) {
                        element.Grade = element.Grade.substr("国家旅游局评定为".length)
                        this.HotelList_RankStarOnly.push(element);
                    }
                });
                console.log("Load 江门市宾馆酒店简化信息:" + r.length);
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
        let x = this.SpotList_GradeAOnly.find(x => this.EncodeURI(x.Name) === name);
        if (x !== undefined) return x;
        //WebApi
    }

    /**景点检索 */
    SearchSpot(key: string): SpotInfo[] {
        //WebApi
        return null;
    }

    /**根据名字获得美食信息 */
    GetFoodInfoByName(name: string): FoodInfo {
        let x = this.FoodList_Hot.find(x => this.EncodeURI(x.Name) === name);
        if (x !== undefined) return x;
        //WebApi
    }

    /**美食检索 */
    SearchFood(key: string): FoodInfo[] {
        //WebApi
        return null;
    }

    /**酒店检索 */
    SearchHotel(key: string): HotelInfo[] {
        if (key === "") return this.HotelList_RankStarOnly;
        return this.HotelList_SZ.filter(x => x.Name.indexOf(key) !== -1).slice(0, 100);
    }
}

/**景区 */
export interface SpotInfo {
    Name: string;
    Type: string;
    ALevel: string;
    Address: string;
    Description: string;
    TicketPrice: number;
    OpenTime: number;
    ServiceTel: number;
    IssueTel: number;
    TrafficGuide: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
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
}

/**宾馆酒店 */
export interface HotelInfo {
    Name: string;
    Grade: string;
    Distract: string;
    Address: string;
    ServiceTel: string;
    Price: number;
    Description: string;
    CommentCount: number;
}