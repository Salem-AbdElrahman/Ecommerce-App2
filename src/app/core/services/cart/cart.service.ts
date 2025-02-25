import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient:HttpClient) { }

  addProductToCart(id:string):Observable<any>{
    return this.httpClient.post(`${enviroments.baseUrl}/api/v1/cart`,
      {
        "productId": id
    }
    )
  }

  getLoggedUserCart():Observable<any>{
    return this.httpClient.get(`${enviroments.baseUrl}/api/v1/cart`)
  }

  removeSpecificCartItem(id:string):Observable<any>{
return this.httpClient.delete(`${enviroments.baseUrl}/api/v1/cart/${id}`
)
  }

  updateProductQuantity(id:string,count:number):Observable<any>{
 return this.httpClient.put(`${enviroments.baseUrl}/api/v1/cart/${id}`,
  {
    "count": count
}
 )
  }
  clearCart():Observable<any>{
    return this.httpClient.delete(`${enviroments.baseUrl}/api/v1/cart`)
  }
}
