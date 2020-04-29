import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiftComponent } from './Gift/gift.component';
import { HotelComponent } from './Hotel/hotel.component';
import { SpotComponent } from './Spot/spot.component';
import { FoodComponent } from './Food/food.component';
import { SpotItemComponent } from './Spot/spotItem.component';
import { AppService } from './app-service';
import { LoginComponent } from './login/login.component';
import { SpotDetailComponent } from './Spot/spotDetail.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxEchartsModule } from 'ngx-echarts';
import { ToolComponent } from './Tool/tool.component';
import { FoodDetailComponent } from './Food/foodDetail.component';
import { HotelDetailComponent } from './Hotel/hotelDetail.component';
import { CommonFunction } from './common';
import { FavItemComponent } from './Tool/favItem.component';
import { FavItemCellComponent } from './Tool/favItemCell.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HotelComponent,
    HotelDetailComponent,
    //景点
    SpotComponent,
    SpotItemComponent,
    SpotDetailComponent,
    FoodComponent,
    FoodDetailComponent,
    GiftComponent,
    ToolComponent,
    FavItemComponent,
    FavItemCellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxEchartsModule
  ],
  providers: [AppService,CommonFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
