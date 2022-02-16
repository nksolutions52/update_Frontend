import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { PagesModule } from './pages/pages.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonFeaturesModule } from './common-features/common-features.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { DentyHttpInterceptor } from './common-features/dentyHttpInterceptor';
import { DatePipe } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    PagesModule,
    CommonFeaturesModule,
    HttpClientModule,
    HttpModule,
    routing,
  //  BsDatepickerModule.forRoot()
  ],
  declarations: [
    AppComponent,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: DentyHttpInterceptor, multi: true },
    DatePipe],
  bootstrap: [AppComponent]

})
export class AppModule { }
