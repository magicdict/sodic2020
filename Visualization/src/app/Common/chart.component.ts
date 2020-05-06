import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
    selector: 'chart',
    templateUrl: './chart.component.html',
})
export class ChartComponent {
    @Input() title = '图表名称';
    @Input() boxstyle = { 'width': '400px', 'height': '400px' };
    @Input() chartstyle = { 'width': '400px', 'height': '400px' };
    @Input() footer = "";
    @Input() options = null;
    @Output() ChartInit = new EventEmitter();
    @Input() miniMode = false;
    public ChartInited(e: any) {
        this.ChartInit.emit(e);
    }
} 
