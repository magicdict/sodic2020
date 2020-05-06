import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http"
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartComponent } from './chart.component';
import { CommonFunction } from './common';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ChartComponent
  ],
  imports: [
    CommonModule,
    NgxEchartsModule,
    HttpClientModule,
  ],
  exports:[
    ChartComponent  //必须要exports出去！！！不然即使引入了这个模块也没有用
  ],
  providers: [CommonFunction],
  bootstrap: []
})
export class MyCommonModule { } //CommonModule是Angular内置模块，改名！！
