import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private httpClient:HttpClient) { }

  getAllBrands():Observable<any>{
return this.httpClient.get(`${enviroments.baseUrl}/api/v1/brands`);
  }

  getSpecificBrands(id:string):Observable<any>{
return this.httpClient.get(`${enviroments.baseUrl}/api/v1/brands/${id}`)
  }
}
