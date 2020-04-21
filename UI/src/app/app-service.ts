import { HttpClient } from "@angular/common/http"
import { Injectable } from '@angular/core';


@Injectable()
export class AppService {

    GradeASpotList: GradeASpot[] = [];

    constructor(public http: HttpClient) {
        let x = this.http.get("assets/json/A级景区基本信息.json").toPromise().then(x => x as GradeASpot[]);
        x.then(
            r => {
                //按照景区的A级进行排序
                let Names:string[] = [];
                r.sort((x, y) => { return y.ZLDJ.length - x.ZLDJ.length });
                r.forEach(
                    spot =>{
                        if (Names.find(x=>x === spot.NAME) === undefined){
                            this.GradeASpotList.push(spot);
                            Names.push(spot.NAME);
                        }
                    }
                )    
                console.log(this.GradeASpotList);
            }
        )
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