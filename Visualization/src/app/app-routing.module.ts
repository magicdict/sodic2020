import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceTopLowComponent } from './visualization/pricetoplow.component';
import { MainComponent } from './Main.component';
import { PirceSegementComponent } from './visualization/pricesegment.component';
import { HotfoodComponent } from './visualization/hotfood.component';
import { SpotOverviewComponent } from './visualization/spotoverview.component';
import { SimpleHeatMapComponent } from './visualization/SimpleHeatMap.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'dashboard/pricesegment',component:PirceSegementComponent},
      { path: 'dashboard/spotoverview/:name',component:SpotOverviewComponent},
      { path: 'food/pricetop/:name', component: PriceTopLowComponent },
      { path: 'food/hot',component:HotfoodComponent},
      { path: 'hotel/pricetop/:name', component: PriceTopLowComponent },
      { path: 'hotel/priceheatmap/:name', component: SimpleHeatMapComponent },
    ]
  },
  { path: '', redirectTo: 'main/dashboard/pricesegment', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
