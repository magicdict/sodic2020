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
import { AppService, IFoodInfoResolver, IHotelInfoResolver, ISpotInfoResolver } from './app-service';
import { LoginComponent } from './login/login.component';
import { SpotDetailComponent } from './Spot/spotDetail.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { FootPrintComponent } from './footPrint/footprint.component';
import { FoodDetailComponent } from './Food/foodDetail.component';
import { HotelDetailComponent } from './Hotel/hotelDetail.component';
import { CommonFunction } from './common';
import { FavItemComponent } from './favourite/favItem.component';
import { FavItemCellComponent } from './favourite/favItemCell.component';
import { CreatePlanComponent } from './PlanMaker/createPlan.component';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { DailyListComponent } from './PlanMaker/dailyList.component';
import { CardModule } from 'primeng/card';
import { DailyPlanComponent } from './PlanMaker/dailyPlan.component';
import { HotelItemComponent } from './Hotel/hotelItem.component';
import { FoodItemComponent } from './Food/foodItem.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FootPrintCellComponent } from './footPrint/footprintCell.component';
import { AddFootPrintComponent } from './footPrint/addfootprint.component';
import { HelpComponent } from './login/help.component';
import { ToastService } from './toasts/toast-service';
import { ToastsContainer } from './toasts/toast-container.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SceneComponent } from './scene/scene.component';
import { SceneMgr } from './SceneMgr';
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
    HelpComponent,
    ToastsContainer,
    SceneComponent      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LazyLoadImageModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    CalendarModule,
    TabViewModule,
    SelectButtonModule,
    CardModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [AppService,SceneMgr, CommonFunction, ToastService, IFoodInfoResolver, IHotelInfoResolver,ISpotInfoResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
