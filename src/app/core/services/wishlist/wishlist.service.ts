import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private httpClient:HttpClient) { }

  addToWishlist(id:string):Observable<any>{
return this.httpClient.post(`${enviroments.baseUrl}/api/v1/wishlist`,
  {

      "productId": id

  }
)
  }


  getLoggedUserWishList():Observable<any>{
    return this.httpClient.get(`${enviroments.baseUrl}/api/v1/wishlist`);
  }

  removeItemFormWishlist(id:string):Observable<any>{
return this.httpClient.delete(`${enviroments.baseUrl}/api/v1/wishlist/${id}`)
  }
}
