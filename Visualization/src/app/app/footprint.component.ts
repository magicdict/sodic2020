import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { FootPrint } from '../Modal';

@Component({
    templateUrl: './footprint.component.html',
})
export class FootprintComponent implements OnInit {

    constructor(private common: CommonFunction) { }
    footprints: FootPrint[];
    ngOnInit(): void {
        let dict: Promise<FootPrint[]> = this.common.httpRequestGet("App/GetFootPrintList");
        dict.then(
            r => {
                this.footprints = r;
            }
        )
    }
}