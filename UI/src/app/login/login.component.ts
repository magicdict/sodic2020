import { Component } from '@angular/core';
import { Router } from '@angular/router';




@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(
    public router: Router,
  ) {

  }

  clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  Start() {
    this.router.navigateByUrl("scene");
  }
  MiniGame() {
    this.router.navigateByUrl("minigame");
  }
  MiniGame2() {
    this.router.navigateByUrl("minigame2");
  }
  Load() {
    this.router.navigateByUrl("scene");
  }
}
