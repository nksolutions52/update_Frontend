import 'flatpickr/dist/flatpickr.css';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './editor.routing';
import { SharedModule } from '../../shared/shared.module';
import { EditorComponent } from './editor.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FlatpickrModule } from 'angularx-flatpickr';
import { ModalModule } from 'ngx-modal';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ModalModule,
        FlatpickrModule.forRoot({
          enable: [
            { from: '1900-01-01', to: '2500-12-31'}
          ]
        }
         
        ),
          CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
          }),
        routing
    ],
    declarations: [
        EditorComponent
    ]
})
export class EditorModule { }
