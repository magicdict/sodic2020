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
import { BasicInfoComponent } from './visualization/basicinfo.component';
import { HotfoodComponent } from './visualization/hotfood.component';
import { SpotOverviewComponent } from './visualization/spotoverview.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { SimpleHeatMapComponent } from './visualization/SimpleHeatMap.component';
import { BookInfoComponent } from './visualization/bookinfo.component';
import { SearchKeyComponent } from './app/searchkey.component';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    SpotOverviewComponent,
    BasicInfoComponent,
    BookInfoComponent,
    HotfoodComponent,
    PriceTopLowComponent,
    SimpleHeatMapComponent,
    SearchKeyComponent
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
