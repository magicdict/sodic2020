import { Component } from '@angular/core';
import { DataStorage } from '../datastorage';
import { Location } from '@angular/common';
import { AppService } from '../app-service';
import { Router } from '@angular/router';

@Component({
    templateUrl: './footprint.component.html',
})
export class FootPrintComponent {
    constructor(private _location: Location, public localstorage: DataStorage,public appservice: AppService,public router: Router,) {

    }
    
    LoadFromLoalStorage() {
        var preview = document.getElementById("preview");
        let r = this.localstorage.Load("Img");
        preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" />';
    }
    Return() {
        this._location.back();
    }
 
}
