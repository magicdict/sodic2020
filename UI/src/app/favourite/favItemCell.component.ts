import { Component, Input } from '@angular/core';
import {  AppService } from '../app-service';
import { Router } from '@angular/router';
import { enmItemType } from '../Model';
@Component({
    selector: "fav-item",
    templateUrl: './favItemCell.component.html',
})
export class FavItemCellComponent {
    constructor(public router: Router, public appservice: AppService) {

    }
    @Input() Item: any;
    giftType = enmItemType.Gift;
    get ImageName(): string {
        if (this.Item.ItemType === enmItemType.Food) return "美食";
        if (this.Item.ItemType === enmItemType.Spot) return "景点";
        if (this.Item.ItemType === enmItemType.Gift) return "礼物";
        if (this.Item.ItemType === enmItemType.Hotel) return "酒店";
    }

    Go() {
        if (this.Item.ItemType === enmItemType.Spot) {
            this.router.navigateByUrl('spot/' + this.appservice.EncodeURI(this.Item.Name));
        }
        if (this.Item.ItemType === enmItemType.Food) {
            this.router.navigateByUrl('food/' + this.appservice.EncodeURI(this.Item.Name));
        }
        if (this.Item.ItemType === enmItemType.Hotel) {
            this.router.navigateByUrl('hotel/' + this.appservice.EncodeURI(this.Item.Name));
        }
    }
}

