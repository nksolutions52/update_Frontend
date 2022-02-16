import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import { RequestOptions } from '@angular/http/src';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { ApiRefs } from '../../common-features/apiRefs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private httpClient: HttpClient, private http: Http) { }


  createPatient(createPatient, isVisited) : any {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.createPatient}?isVisited=${isVisited}`
    return this.httpClient.post(url, createPatient);
  }
  
  generatePdf(createPatient) : any {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.generatePdf}`
    return this.httpClient.post(url, createPatient,{responseType: 'arraybuffer'});
  }

  createAppointment(response, isVisited) {
    const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.createAppointment}?isVisited=${isVisited}`
    return this.httpClient.post(url, response);
  }
  // generatePdf(createPatient): Observable<any> {
  //   let params = new HttpParams();
  //   params = params.append('consultee', JSON.stringify(createPatient));
  //   // params = params.append('id', id);
  //   const url = `${ApiRefs.baseURL}${ApiRefs.baseContext}${ApiRefs.generatePdf}`
  //   console.log(url);
  //   return this.httpClient.post(url, { params }).map((response: Response) => {
  //       const result = response;
  //       return result;
  //     });
  //   }
}
