import { Component } from '@angular/core';
import { AppService } from '../app-service';
import { Router } from '@angular/router';
import { DataStorage } from '../datastorage';
import { Location } from '@angular/common';
import { getOrientation } from "get-orientation/browser";
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FootprintItem } from '../Model';
import { ToastService } from '../toasts/toast-service';

@Component({
    templateUrl: './addfootprint.component.html',
})
export class AddFootPrintComponent {
    constructor(private _location: Location,
        public router: Router,
        public localstorage: DataStorage,
        public appservice: AppService,
        public http: HttpClient,
        public toastService: ToastService,
        public fb: FormBuilder
    ) {
        this.form = this.fb.group({
            UserImage: [null]
        })
    }
    item: FootprintItem = {
        Title: "", Address: "", Src: "", Datetime: "", Description: "", Rotate: ""
    };
    title: string;
    address: string;
    description: string;
    static Orientation = 1;
    static OrientationClass = "";
    form: FormGroup;
    PreviewImage(x: Event) {
        let e = x.srcElement as HTMLInputElement;
        let fileObj = e.files[0];
        getOrientation(fileObj).then(
            orientation => {
                var reader = new FileReader();
                AddFootPrintComponent.Orientation = orientation;
                reader.readAsDataURL(fileObj);
                reader.onload = () => { this.FinishRun(reader.result) };    //Instance Method
            }
        );

        //准备数据
        this.form.patchValue(
            { UserImage: fileObj }
        );
        this.form.get('UserImage').updateValueAndValidity()
    }

    FinishRun(result: string | ArrayBuffer): any {
        var preview = document.getElementById("preview");
        let x = this.compress(result, 320, 0.5) as Promise<string>;
        x.then(
            r => {
                switch (AddFootPrintComponent.Orientation) {
                    case 3:
                        AddFootPrintComponent.OrientationClass = "rotate180";
                        preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" height="320px" class="rotate180" />';
                        break;
                    case 6:
                        AddFootPrintComponent.OrientationClass = "rotate90";
                        preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" height="320px" class="rotate90" />';
                        break;
                    case 9:
                        AddFootPrintComponent.OrientationClass = "rotate270";
                        preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" height="320px" class="rotate270" />';
                        break;
                    default:
                        AddFootPrintComponent.OrientationClass = "";
                        preview.innerHTML = '<img id="PreviewImage" src="' + r + '" alt="" width="320px" height="320px" />';
                        break;
                }
            }
        )
    }
    compress(base64String, w, quality) {
        var getMimeType = function (urlData) {
            var arr = urlData.split(',');
            var mime = arr[0].match(/:(.*?);/)[1];
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
            //这里如果使用ctx.rotate方法的话，保存之后的数据是不可用的...
            ctx.drawImage(newImage, 0, 0, canvas.width, canvas.height);
            var base64 = canvas.toDataURL(getMimeType(base64String), quality);
            return base64;
        });
    }

    SaveToLoalStorage() {
        if (this.title === undefined || this.address === undefined || this.description === undefined) {
            this.toastService.show('填写内容不完整', { classname: 'bg-danger text-light', delay: 3000 });
            return;
        }
        this.item.Title = this.title;
        this.item.Rotate = AddFootPrintComponent.OrientationClass;
        this.item.Address = this.address;
        this.item.Description = this.description;
        var preview = document.getElementById("PreviewImage") as HTMLImageElement;
        if (preview === null) {
            this.toastService.show('请添加图片', { classname: 'bg-danger text-light', delay: 3000 });
            return;
        }
        this.item.Src = preview.src;
        let now = new Date();
        this.item.Datetime = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日"
            + now.getHours() + "时" + now.getMinutes() + "分" + now.getSeconds() + "秒";
        this.appservice.AddToFootprint(this.item);
        this.SaveToWeb();
    }
    SaveToWeb() {
        var formData: FormData = new FormData();
        formData.append("UserImage", this.form.get('UserImage').value);
        formData.append("Title", this.item.Title);
        formData.append("Address", this.item.Address);
        formData.append("Description", this.item.Description);
        formData.append("Datetime", this.item.Datetime);
        //发送数据
        this.http.post('http://39.105.206.6:8080/App/SetFootPrint', formData).subscribe(
            (response) => {
                console.log(response);
                this.Return();
            },
            (error) => {
                console.log(error);
                this.Return();
            }
        )
    }
    Return() {
        this._location.back();
    }
}
