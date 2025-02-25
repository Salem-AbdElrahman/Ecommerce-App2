import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private httpClient:HttpClient) { }
  checkOutPayment(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${enviroments.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
      "shippingAddress":data
    })
  }
  getAllOrders(id:string):Observable<any>{
return this.httpClient.get(`${enviroments.baseUrl}/api/v1/orders/user/${id}`)
  }
  cachePayment(id:string,data:object):Observable<any>{
    return this.httpClient.post(`${enviroments.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,{
      "shippingAddress":data
    })
  }
}
