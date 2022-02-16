import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRefs } from '../../common-features/apiRefs';

@Injectable({
  providedIn: 'root'
})
export class EditorService {

  constructor(private httpClient: HttpClient) { } 

  getMonthAppointments(startDate, endDate): Observable<any> {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.getMonthAppointment}?startdate=${startDate}
    &enddate=${endDate}`
    return this.httpClient.get(url);
  }
}
