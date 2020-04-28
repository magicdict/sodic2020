import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficComponent } from './Traffic/traffic.component';
import { HotelComponent } from './Hotel/hotel.component';
import { FoodComponent } from './Food/food.component';
import { SpotComponent } from './Spot/spot.component';
import { LoginComponent } from './login/login.component';
import { SpotDetailComponent } from './Spot/spotDetail.component';
import { ToolComponent } from './Tool/tool.component';
import { FoodDetailComponent } from './Food/foodDetail.component';
import { HotelDetailComponent } from './Hotel/hotelDetail.component';


const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: 'traffic', component: TrafficComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'food', component: FoodComponent },
  { path: 'spot', component: SpotComponent },
  { path: 'tool', component: ToolComponent },
  { path: 'spot/:name', component: SpotDetailComponent },
  { path: 'food/:name', component: FoodDetailComponent },
  { path: 'hotel/:name', component: HotelDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
