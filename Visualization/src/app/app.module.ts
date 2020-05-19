import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PriceTopLowComponent } from './visualization/pricetoplow.component';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { MainComponent } from './Main.component';
import { MyCommonModule } from './Common/MyCommon.module';
import { PirceSegementComponent } from './visualization/pricesegment.component';
import { HotfoodComponent } from './visualization/hotfood.component';
import { SpotOverviewComponent } from './visualization/spotoverview.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SpotOverviewComponent,
    PirceSegementComponent,
    HotfoodComponent,
    PriceTopLowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEchartsModule.forRoot({
      echarts,
    }),
    HttpClientModule,
    MyCommonModule,
    SelectButtonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
