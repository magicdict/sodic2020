import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';
import { DataStorage } from './datastorage';
import { CommonFunction } from './common';
import { SelectItem } from 'primeng/api/selectitem';
import { SceneMgr } from './SceneMgr';
import { enmItemType, FootprintItem, PlanInfo, DailyInfo, SpotInfo, FoodInfo, HotelInfo, TourInfo, GiftInfo, WaitLineInfo } from './Model';

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

    //排队信息
    SpotWaitFor: WaitLineInfo[] = [];

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

    public InitWaitFor() {
        this.SpotWaitFor.push(
            {
                Spot: "世界之窗",
                Items: [{ name: "极速富士山", value: 0 },
                { name: "重返侏罗纪", value: 0 },
                { name: "穿越欧罗巴", value: 0 },
                { name: "飞跃美利坚", value: 0 },
                { name: "阿尔卑斯冰雪世界", value: 0 },
                { name: "亚马逊丛林穿梭", value: 0 }]
            }
        );
        this.SpotWaitFor.push(
            {
                Spot: "深圳欢乐谷",
                Items: [{ name: "发现者", value: 0 },
                { name: "激光战车", value: 0 },
                { name: "UFO", value: 0 },
                { name: "龙卷风", value: 0 },
                { name: "尖峰时刻", value: 0 },
                { name: "欢乐风火轮", value: 0 },
                { name: "四维影院", value: 0 },
                { name: "寻梦河", value: 0 },
                { name: "火车总站", value: 0 },
                { name: "冰雪世界", value: 0 },
                { name: "丛林水战", value: 0 },
                { name: "北极探险", value: 0 },
                { name: "旋转木马", value: 0 },
                { name: "蚁兵特工队", value: 0 },
                { name: "逍遥水母", value: 0 },
                { name: "模拟消防队", value: 0 },
                { name: "骑警训练营", value: 0 },
                { name: "太空梭", value: 0 },
                { name: "森林攀爬", value: 0 },
                { name: "金涛骇浪", value: 0 },
                { name: "环翼飞车", value: 0 },
                { name: "金矿漂流", value: 0 },
                { name: "矿山车", value: 0 },
                { name: "金矿攀爬", value: 0 },
                { name: "雪域雄鹰", value: 0 },
                { name: "雪山飞龙", value: 0 },
                { name: "追风者", value: 0 },
                { name: "彩云之翼", value: 0 },
                { name: "恰恰大草帽", value: 0 },
                { name: "异度空间迷藏", value: 0 },
                { name: "骷髅岛", value: 0 },
                ]
            }
        );
    }

    UserFaceFileName: string[] = [
        "乐正宇.JPG",
        "刘锋.JPG",
        "千仞雪.JPG",
        "千寻疾.JPG",
        "千道流.JPG",
        "原恩夜辉.JPG",
        "原恩辉辉.JPG",
        "古月娜.JPG",
        "叶星澜.JPG",
        "唐啸.JPG",
        "唐昊.JPG",
        "唐晨.JPG",
        "唐舞麟.JPG",
        "唐轩宇.JPG",
        "唐雅.JPG",
        "唐雨格.JPG",
        "孟依然.JPG",
        "宁天.JPG",
        "宁风致.JPG",
        "尘心.JPG",
        "徐三石.JPG",
        "徐云瀚.jpg",
        "徐和.JPG",
        "徐笠智.JPG",
        "戴云儿.JPG",
        "戴浩.JPG",
        "戴维斯.JPG",
        "朱竹云.JPG",
        "橘子.JPG",
        "比比东.JPG",
        "江楠楠.JPG",
        "波塞西.JPG",
        "火无双.JPG",
        "火舞.JPG",
        "玄子.JPG",
        "玉天恒.JPG",
        "白沉香.JPG",
        "白秀秀.JPG",
        "穆恩.JPG",
        "胡列娜.JPG",
        "萧萧.JPG",
        "蓝梦琴.JPG",
        "蛇婆.JPG",
        "许小言.JPG",
        "谢邂.JPG",
        "贝贝.JPG",
        "钱磊.JPG",
        "阿银.JPG",
        "霍云儿.JPG",
        "霍斩疾.JPG",
        "风笑天.JPG",
        "骨斗罗.JPG",
        "鬼魅.JPG",
        "龙公.JPG",
        "钱磊.JPG",
        "阿银.JPG",
        "霍云儿.JPG",
        "霍斩疾.JPG",
        "风笑天.JPG",
        "骨斗罗.JPG",
        "鬼魅.JPG",
        "龙公.JPG",
    ]

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
        this.InitWaitFor();
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

