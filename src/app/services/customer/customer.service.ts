import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/customer';

  constructor(public http: WrapHttpService) { }

  registerCustomer(data): Observable<any> {
    return this.http.post(this.apiUrl + `/register`, data );
  }

  customerLogin(data): Observable<any> {
    return this.http.post(this.apiUrl + `/login`, data );
  }
}
