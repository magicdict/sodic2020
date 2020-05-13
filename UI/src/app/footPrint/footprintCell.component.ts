import { Component, Input } from '@angular/core';
import { AppService, FootprintItem } from '../app-service';
import { Router } from '@angular/router';
@Component({
    selector: "footprint-item",
    templateUrl: './footprintCell.component.html',
})
export class FootPrintCellComponent {
    constructor(public router: Router, public appservice: AppService) {

    }
    @Input() Item: FootprintItem;
}

