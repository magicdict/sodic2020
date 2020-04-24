import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrafficComponent } from './Traffic/traffic.component';
import { HotelComponent } from './Hotel/hotel.component';
import { SpotComponent } from './Spot/spot.component';
import { FoodComponent } from './Food/food.component';
import { SpotItemComponent } from './Spot/spotItem.component';
import { AppService } from './app-service';
import { LoginComponent } from './login/login.component';
import { SpotDetailComponent } from './Spot/spotDetail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HotelComponent,
    //景点
    SpotComponent,
    SpotItemComponent,
    SpotDetailComponent,
    FoodComponent,
    TrafficComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
