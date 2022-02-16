import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiRefs } from '../../common-features/apiRefs';

@Injectable({
  providedIn: 'root'
})
export class IndexService {

  constructor(private httpClient: HttpClient) { }

  getConsultees(): Observable<any> {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.getConsultees}`;
    return this.httpClient.get(url);
  }

  getAppointmentCount(startDate,endDate) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.getAppointmentsCount}?startdate=${startDate}&enddate=${endDate}`;
    return this.httpClient.get(url);
  }

  getSearchConsultee(searchConsultee) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.searchConsultee}?firstname=${searchConsultee}`;
    return this.httpClient.get(url);
  }

  getAppointmentsById(consultantId) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.getConsultantHistory}?patientId=${consultantId}`;
    return this.httpClient.get(url);
  }

  editAppointment(consultant, isVisited) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.editAppointment}?isVisited=${isVisited}`;
    return this.httpClient.put(url, consultant);
  }

  createAppointment(consultant, isVisited) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.createAppointment}?isVisited=${isVisited}`;
    return this.httpClient.post(url, consultant);
  }

}
