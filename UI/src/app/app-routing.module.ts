import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrafficComponent } from './Traffic/traffic.component';
import { HotelComponent } from './Hotel/hotel.component';
import { FoodComponent } from './Food/food.component';
import { SpotComponent } from './Spot/spot.component';


const routes: Routes = [
  { path: 'traffic', component: TrafficComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'food', component: FoodComponent },
  { path: 'spot', component: SpotComponent },
  { path: '', redirectTo: 'traffic', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
