import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './icon.routing';
import { SharedModule } from '../../shared/shared.module';
import { IconComponent } from './icon.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-modal';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxPaginationModule,
        FormsModule,
        ModalModule,
        routing
    ],
    declarations: [
        IconComponent
    ]
})
export class IconModule { }
