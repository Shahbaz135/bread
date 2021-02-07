import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/order';

  constructor(public http: WrapHttpService) { }

  createOrder(data): Observable<any> {
    return this.http.post(this.apiUrl + `/create`, data );
  }
}
