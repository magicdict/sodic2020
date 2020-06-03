import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceTopLowComponent } from './visualization/pricetoplow.component';
import { MainComponent } from './Main.component';
import { BasicInfoComponent } from './visualization/basicinfo.component';
import { HotfoodComponent } from './visualization/hotfood.component';
import { SpotOverviewComponent } from './visualization/spotoverview.component';
import { SimpleHeatMapComponent } from './visualization/SimpleHeatMap.component';
import { BookInfoComponent } from './visualization/bookinfo.component';
import { SearchKeyComponent } from './app/searchkey.component';
import { FootprintComponent } from './app/footprint.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'dashboard/basicinfo', component: BasicInfoComponent },
      { path: 'dashboard/bookinfo', component: BookInfoComponent },
      { path: 'dashboard/spotoverview/:name', component: SpotOverviewComponent },
      { path: 'food/pricetop/:name', component: PriceTopLowComponent },
      { path: 'food/hot', component: HotfoodComponent },
      { path: 'hotel/pricetop/:name', component: PriceTopLowComponent },
      { path: 'hotel/priceheatmap/:name', component: SimpleHeatMapComponent },
      { path: 'food/priceheatmap/:name', component: SimpleHeatMapComponent },
      { path: 'app/searchkey', component: SearchKeyComponent },
      { path: 'app/footprint', component: FootprintComponent },
    ]
  },
  { path: '', redirectTo: 'main/dashboard/basicinfo', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
