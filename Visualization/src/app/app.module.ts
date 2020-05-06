import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoodPriceTopComponent } from './visualization/foodpricetop.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MainComponent } from './Main.component';
import { MyCommonModule } from './Common/MyCommon.module';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FoodPriceTopComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule,
    HttpClientModule,
    MyCommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
