import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { Favourite, enmItemType } from '../Modal';

@Component({
    templateUrl: './favourite.component.html',
})
export class FavouriteComponent implements OnInit {

    constructor(private common: CommonFunction) { }
    favourite: Favourite[];
    ngOnInit(): void {
        let dict: Promise<Favourite[]> = this.common.httpRequestGet("App/GetFavourite");
        dict.then(
            r => {
                this.favourite = r.sort((x,y)=>{return y.Count - x.Count});
            }
        )
    }
    getCatagory(c: enmItemType): string {
        switch (c) {
            case enmItemType.Food:
                return "餐厅"
            case enmItemType.Gift:
                return "伴手礼"
            case enmItemType.Hotel:
                return "宾馆"
            case enmItemType.Spot:
                return "景点"
        }
    }
}