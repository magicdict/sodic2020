import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PriceTopLowComponent } from './visualization/pricetoplow.component';
import { MainComponent } from './Main.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'foodpricetop/:name', component: PriceTopLowComponent },
      { path: 'hotelpricetop/:name', component: PriceTopLowComponent },
    ]
  },
  { path: '', redirectTo: 'main/foodpricetop/sz', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
