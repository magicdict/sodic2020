import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FoodPriceTopComponent } from './visualization/foodpricetop.component';


const routes: Routes = [
  { path: 'foodpricetop', component: FoodPriceTopComponent },
  { path: '', redirectTo: 'foodpricetop', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
