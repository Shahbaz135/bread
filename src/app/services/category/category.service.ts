import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public readonly apiUrl = HttpConfig.getApiUrl() + '/category';

  constructor(public http: WrapHttpService) { }

  getCategories(data?): Observable<any> {
    return this.http.get(this.apiUrl + `/getByPartner` + WrapHttpService.objToQuery(data));
  }

  getCategoriesRegular(data): Observable<any> {
    return this.http.get(this.apiUrl + `/getByAreaRegular` + WrapHttpService.objToQuery(data));
  }
}
