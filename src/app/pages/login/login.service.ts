import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiRefs } from '../../common-features/apiRefs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(obj): Observable<any> {
    const url = `${ApiRefs.baseURL}${ApiRefs.authentication}`
    return this.httpClient.post(url, obj);
  }
}
