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
    SpotList_SZ: SpotInfo[] = [];
    SpotList_JM: SpotInfo[] = [];
    SpotList_GradeAOnly: SpotInfo[] = [];

    FoodList_SZ: FoodInfo[] = [];
    FoodList_JM: FoodInfo[] = [];

    HotelList_SZ: HotelInfo[] = [];
    HotelList_JM: HotelInfo[] = [];
    HotelList_RankStarOnly: HotelInfo[] = [];

    constructor(public http: HttpClient, public localstorage: DataStorage) {
        //用户数据的载入
        this.FavSpotName = this.localstorage.Load("FavSpotName");
        if (this.FavSpotName === null) this.FavSpotName = [];
        console.log("Fav Spot Name List:" + this.FavSpotName);

        let spot_sz = this.http.get("assets/json/深圳市旅游景点信息.json").toPromise().then(x => x as SpotInfo[]);
        spot_sz.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.ALevel.length - x.ALevel.length });
                this.SpotList_SZ = r;
                console.log("Load 深圳市旅游景点信息:" + r.length);
                r.forEach(element => {
                    if (element.ALevel !== "") {
                        this.SpotList_GradeAOnly.push(element);
                    }
                });
            }
        )

        return;

        let spot_jm = this.http.get("assets/json/江门市旅游景点信息.json").toPromise().then(x => x as SpotInfo[]);
        spot_jm.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.ALevel.length - x.ALevel.length });
                this.SpotList_JM = r;
                console.log("Load 江门市旅游景点信息:" + r.length);
                r.forEach(element => {
                    if (element.ALevel !== "") {
                        this.SpotList_GradeAOnly.push(element);
                    }
                });
            }
        )

        let food_sz = this.http.get("assets/json/深圳市特色美食信息.json").toPromise().then(x => x as FoodInfo[]);
        food_sz.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.Price - x.Price });
                this.FoodList_SZ = r;
                console.log("Load 深圳市特色美食信息:" + r.length);
            }
        )

        let food_jm = this.http.get("assets/json/江门市特色美食信息.json").toPromise().then(x => x as FoodInfo[]);
        food_jm.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.Price - x.Price });
                this.FoodList_JM = r;
                console.log("Load 江门市特色美食信息:" + r.length);
            }
        )

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

    /**根据名字获得景点信息 */
    GetSpotInfoByName(name: string): SpotInfo {
        return this.SpotList_SZ.find(x => x.Name === name);
    }

    /**景点检索 */
    SearchSpot(key: string): SpotInfo[] {
        return this.SpotList_SZ.filter(x => x.Name.indexOf(key) !== -1);
    }

    /**美食检索 */
    SearchFood(key: string): FoodInfo[] {
        return this.FoodList_SZ.filter(x => x.Item.filter(y => y.indexOf(key) !== -1).length !== 0).slice(0, 100);
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
}

/**美食 */
export interface FoodInfo {
    Name: string;
    Address: string;
    Item: string[];
    Price: number;
    lat: number;
    lng: number;
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
}