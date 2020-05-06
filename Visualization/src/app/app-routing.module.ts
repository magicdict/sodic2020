import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodPriceTopComponent } from './visualization/foodpricetop.component';
import { MainComponent } from './Main.component';


const routes: Routes = [
  {
    path: 'main', component: MainComponent,
    children: [
      { path: 'foodpricetop/:name', component: FoodPriceTopComponent },
    ]
  },
  { path: '', redirectTo: 'main/foodpricetop/sz', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
