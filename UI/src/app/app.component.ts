import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './app-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UI';
  
  constructor( private router: Router,private appservice : AppService){

  }
  JumpTo(url: string) {
      this.router.navigate([url]);
  }
}
