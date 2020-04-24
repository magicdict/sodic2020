import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';


@Injectable()
export class AppService {

    clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    GradeASpotList: GradeASpot[] = [];

    SpotList_SZ: SpotInfo[] = [];
    SpotList_JM: SpotInfo[] = [];
    SpotList_GradeAOnly: SpotInfo[] = [];

    constructor(public http: HttpClient) {
        let x = this.http.get("assets/json/A级景区基本信息.json").toPromise().then(x => x as GradeASpot[]);
        x.then(
            r => {
                //按照景区的A级进行排序
                let Names: string[] = [];
                r.sort((x, y) => { return y.ZLDJ.length - x.ZLDJ.length });
                r.forEach(
                    spot => {
                        if (Names.find(x => x === spot.NAME) === undefined) {
                            this.GradeASpotList.push(spot);
                            Names.push(spot.NAME);
                        }
                    }
                )

            }
        )
        let y1 = this.http.get("assets/json/深圳市旅游景点信息.json").toPromise().then(x => x as SpotInfo[]);
        y1.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.ALevel.length - x.ALevel.length });
                this.SpotList_SZ = r;
                r.forEach(element => {
                    if (element.ALevel !==""){
                        this.SpotList_GradeAOnly.push(element);
                    }   
                });    
            }
        )
        let y2 = this.http.get("assets/json/江门市旅游景点信息.json").toPromise().then(x => x as SpotInfo[]);
        y2.then(
            r => {
                //按照景区的A级进行排序
                r.sort((x, y) => { return y.ALevel.length - x.ALevel.length });
                this.SpotList_JM = r;
                r.forEach(element => {
                    if (element.ALevel !==""){
                        this.SpotList_GradeAOnly.push(element);
                    }   
                }); 
            }
        )

    }

    GetSpotInfoByName(name: string): SpotInfo {
        return this.SpotList_SZ.find(x => x.Name === name);
    }
}

/**A级景区 */
export interface GradeASpot {
    ZLDJ: string;
    AREA: string;
    CONTECTPHONE: string;
    DESCRIPTION: string;
    ADDRESS: string;
    CZ: string;
    HTTP: string;
    EMAIL: string;
    //RECORDID: string;
    NAME: string;
}

/**A级景区 */
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
}