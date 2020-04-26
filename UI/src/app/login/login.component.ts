import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    public router: Router,
    public app: AppService
  ) {
    //在首页事先将AppService初始化掉！
  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

}
