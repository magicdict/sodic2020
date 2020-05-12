import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiftComponent } from './Gift/gift.component';
import { HotelComponent } from './Hotel/hotel.component';
import { FoodComponent } from './Food/food.component';
import { SpotComponent } from './Spot/spot.component';
import { LoginComponent } from './login/login.component';
import { SpotDetailComponent } from './Spot/spotDetail.component';
import { FoodDetailComponent } from './Food/foodDetail.component';
import { HotelDetailComponent } from './Hotel/hotelDetail.component';
import { FavItemComponent } from './favourite/favItem.component';
import { CreatePlanComponent } from './PlanMaker/createPlan.component';
import { DailyListComponent } from './PlanMaker/dailyList.component';
import { DailyPlanComponent } from './PlanMaker/dailyPlan.component';
import { FootPrintComponent } from './footPrint/footprint.component';
import { AddFootPrintComponent } from './footPrint/addfootprint.component';

const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'gift', component: GiftComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'food', component: FoodComponent },
  { path: 'spot', component: SpotComponent },
  { path: 'tool', component: CreatePlanComponent },
  { path: 'favitem', component: FavItemComponent },
  { path: 'spot/:name', component: SpotDetailComponent },
  { path: 'food/:name', component: FoodDetailComponent },
  { path: 'hotel/:name', component: HotelDetailComponent },
  { path: 'dailylist', component: DailyListComponent },
  { path: 'dailyplan', component: DailyPlanComponent },
  { path: 'footprint', component: FootPrintComponent },
  { path: 'addfootprint', component: AddFootPrintComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
