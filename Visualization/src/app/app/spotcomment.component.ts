import { Component, OnInit } from '@angular/core';
import { CommonFunction } from '../Common/common';
import { SpotComment } from '../Modal';

@Component({
    templateUrl: './spotcomment.component.html',
})
export class SpotCommentComponent implements OnInit {

    constructor(private common: CommonFunction) { }
    spotcomment: SpotComment[];
    ngOnInit(): void {
        let dict: Promise<SpotComment[]> = this.common.httpRequestGet("App/GetSpotComment");
        dict.then(
            r => {
                this.spotcomment = r;
            }
        )
    }
}