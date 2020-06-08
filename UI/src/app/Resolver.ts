import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpotInfo, FoodInfo, HotelInfo } from './Model';
import { AppService } from './app-service';
import { CommonFunction } from './common';
import { Observable } from 'rxjs';

@Injectable()
export class ISpotInfoResolver implements Resolve<SpotInfo> {
    constructor(private homeservice: AppService, public commonFunction: CommonFunction) {

    }
    resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): SpotInfo | Observable<SpotInfo> | Promise<SpotInfo> {
        let name = route.paramMap.get('name');
        let x = this.homeservice.SpotList_CurrentShow.find(x => this.homeservice.EncodeURI(x.Name) === name);
        if (x != undefined) return x;
        return this.commonFunction.httpRequestGet<SpotInfo>("search/GetSpotByName?Name=" + name);
    }
}

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