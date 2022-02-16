import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { routing } from './index.routing';
import { SharedModule } from '../../shared/shared.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modal';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxEchartsModule,
        NgxPaginationModule,
        FormsModule,
        ModalModule,
      //  BsDatepickerModule,
        routing
    ],
    declarations: [
        IndexComponent
    ]
})
export class IndexModule { }
