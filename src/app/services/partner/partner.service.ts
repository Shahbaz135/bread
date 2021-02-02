import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/partner';

  constructor(public http: WrapHttpService) { }

  getPartnerByPostalCode(postalCode: number): Observable<any> {
    const conditions: object = { postalCode};
    return this.http.get(this.apiUrl + WrapHttpService.objToQuery(conditions));
  }

}
