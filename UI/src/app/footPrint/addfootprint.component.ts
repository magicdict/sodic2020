import { Component } from '@angular/core';
import { AppService, FootprintItem } from '../app-service';
import { Router } from '@angular/router';
import { DataStorage } from '../datastorage';
import { Location } from '@angular/common';

@Component({
    templateUrl: './addfootprint.component.html',
})
export class AddFootPrintComponent {
    constructor(private _location: Location, public router: Router, public localstorage: DataStorage, public appservice: AppService) {

    }
    item: FootprintItem = {
        Title: "", Address: "", Src: "", Datetime: "", Description: ""
    };
    title: string;
    address: string;
    description:string;
    PreviewImage(x: Event) {
        let e = x.srcElement as HTMLInputElement;
        let fileObj = e.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(fileObj);
        reader.onload = this.FinishRun;
    }

    FinishRun(this: FileReader): any {
        var preview = document.getElementById("preview");
        let x = AddFootPrintComponent.compress(this.result, 320, 0.5) as Promise<string>;
        x.then(
            r => {
                console.log("FinishRun!");
                preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" height="320px" />';
            }
        )
    }
    static compress(base64String, w, quality) {
        var getMimeType = function (urlData) {
            var arr = urlData.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
            // return mime.replace("image/", "");
            return mime;
        };
        var newImage = new Image();
        var imgWidth, imgHeight;

        var promise = new Promise(resolve => newImage.onload = resolve);
        newImage.src = base64String;
        return promise.then(() => {
            imgWidth = newImage.width;
            imgHeight = newImage.height;
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            if (Math.max(imgWidth, imgHeight) > w) {
                if (imgWidth > imgHeight) {
                    canvas.width = w;
                    canvas.height = w * imgHeight / imgWidth;
                } else {
                    canvas.height = w;
                    canvas.width = w * imgWidth / imgHeight;
                }
            } else {
                canvas.width = imgWidth;
                canvas.height = imgHeight;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL(getMimeType(base64String), quality);
            console.log(base64);
            return base64;
        });
    }
    SaveToLoalStorage() {
        this.item.Title = this.title;
        this.item.Address = this.address;
        this.item.Description = this.description;
        var preview = document.getElementById("PreviewImage") as HTMLImageElement;
        this.item.Src = preview.src;
        let now = new Date();
        this.item.Datetime = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日"
        this.appservice.AddToFootprint(this.item);
        this._location.back();
    }
    Return() {
        this._location.back();
    }
}
