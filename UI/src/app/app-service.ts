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
    IsLoadHotelFinished = false;

    get IsLoadFinish() {
        return this.IsLoadFoodFinished && this.IsLoadSpotFinished && this.IsLoadHotelFinished;
    }

    SpotList_GradeAOnly: SpotInfo[] = [];
    FoodList_Hot: FoodInfo[] = [];
    HotelList_Hot: HotelInfo[] = [];

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

        let food = this.http.get("assets/json/热门特色美食信息.json").toPromise().then(x => x as FoodInfo[]);
        food.then(
            r => {
                this.FoodList_Hot = r;
                this.IsLoadFoodFinished = true;
            }
        )

        let hotel = this.http.get("assets/json/热门宾馆酒店信息.json").toPromise().then(x => x as HotelInfo[]);
        hotel.then(
            r => {
                this.HotelList_Hot = r;
                this.IsLoadHotelFinished = true;
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

    /**根据名字获得美食信息 */
    GetHotelInfoByName(name: string): HotelInfo {
        let x = this.HotelList_Hot.find(x => this.EncodeURI(x.Name) === name);
        if (x !== undefined) return x;
        //WebApi
    }

    /**酒店检索 */
    SearchHotel(key: string): HotelInfo[] {
        if (key === "") return this.HotelList_Hot;
        //WebApi
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
    Description: string;
    ServiceTel: string;
    Price: number;
    lat: number;
    lng: number;
    Comments: string[];
    CommentCount: number;
}