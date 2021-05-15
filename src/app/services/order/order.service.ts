import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpConfig } from '../../../config/http-config';
import { WrapHttpService } from '../common/wrap-http.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public readonly apiUrl = HttpConfig.getApiUrl() + '/order';
  public readonly interruptionUrl = HttpConfig.getApiUrl() + '/interruption';
  public readonly invoiceUrl = HttpConfig.getApiUrl() + '/invoice';
  public readonly deliveryChargeUrl = HttpConfig.getApiUrl() + '/deliveryCharges';

  constructor(public http: WrapHttpService) { }

  createOrder(data): Observable<any> {
    return this.http.post(this.apiUrl + `/create`, data );
  }

  getOrders(data): Observable<any> {
    return this.http.get(this.apiUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  getOrderById(data): Observable<any> {
    return this.http.get(this.apiUrl + `/getById` + WrapHttpService.objToQuery(data));
  }

  changeOrder(data, id): Observable<any> {
    return this.http.put(this.apiUrl + `/` + id, data );
  }

  deleteOrder(id): Observable<any> {
    return this.http.delete(this.apiUrl + `/` + id);
  }

  createOrderInterruption(data): Observable<any> {
    return this.http.post(this.interruptionUrl + `/create`, data );
  }

  getOrderInterruptions(data): Observable<any> {
    return this.http.get(this.interruptionUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  createAdditionalOrder(data): Observable<any> {
    return this.http.post(this.apiUrl + `/addition/create`, data );
  }

  getAdditionalOrders(data): Observable<any> {
    return this.http.get(this.apiUrl + `/addition/get` + WrapHttpService.objToQuery(data));
  }

  deleteAdditionalOrder(id): Observable<any> {
    return this.http.delete(this.apiUrl + `/addition/` + id);
  }

  getInvoices(data?): Observable<any> {
    return this.http.get(this.invoiceUrl + `/get` + WrapHttpService.objToQuery(data));
  }

  getInvoicePDF(data?): Observable<any> {
    return this.http.get(this.invoiceUrl + `/get/pdf` + WrapHttpService.objToQuery(data));
  }

  getDeliveryCharges(data?): Observable<any> {
    return this.http.get(this.deliveryChargeUrl + `/get` + WrapHttpService.objToQuery(data));
  }
}
