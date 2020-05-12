import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FootPrintComponent } from './footPrint/footprint.component';
import { FoodDetailComponent } from './Food/foodDetail.component';
import { HotelDetailComponent } from './Hotel/hotelDetail.component';
import { CommonFunction } from './common';
import { FavItemComponent } from './favourite/favItem.component';
import { FavItemCellComponent } from './favourite/favItemCell.component';
import { CreatePlanComponent } from './PlanMaker/createPlan.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { DailyListComponent } from './PlanMaker/dailyList.component';
import { CardModule } from 'primeng/card';
import { DailyPlanComponent } from './PlanMaker/dailyPlan.component';
import { HotelItemComponent } from './Hotel/hotelItem.component';
import { FoodItemComponent } from './Food/foodItem.component';
import {SelectButtonModule} from 'primeng/selectbutton';
import { FootPrintCellComponent } from './footPrint/footprintCell.component';
import { AddFootPrintComponent } from './footPrint/addfootprint.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HotelComponent,
    HotelItemComponent,
    HotelDetailComponent,
    //景点
    SpotComponent,
    SpotItemComponent,
    SpotDetailComponent,
    FoodComponent,
    FoodItemComponent,
    FoodDetailComponent,
    GiftComponent,
    FootPrintComponent,
    AddFootPrintComponent,
    FootPrintCellComponent,
    FavItemComponent,
    FavItemCellComponent,
    CreatePlanComponent,
    DailyListComponent,
    DailyPlanComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxEchartsModule,
    CalendarModule,
    TabViewModule,
    SelectButtonModule,
    CardModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [AppService, CommonFunction],
  bootstrap: [AppComponent]
})
export class AppModule { }
