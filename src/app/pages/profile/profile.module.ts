import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { routing } from './profile.routing';
import { SharedModule } from '../../shared/shared.module';
import { ProfileComponent } from './profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        HttpClientModule,
        routing
    ],
    declarations: [
        ProfileComponent
    ]
})
export class ProfileModule { }
