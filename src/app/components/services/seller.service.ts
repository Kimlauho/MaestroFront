import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Seller } from '../models/seller.model';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  seller: Seller = {
    code: null,
    name: '',
    lastName: '',
    document: '',
    cityId: 0
  };

  constructor(private http: HttpClient) { }

  createEditSeller(seller: Seller): Observable<any[]> {
    return this.http.post(environment.apiUrl +'/api/Seller/CreateEditSeller', seller)
    .pipe(
      map((response: any[]) => {
        return response;
      })
    );
  }

  getSellers(): Observable<Seller[]> {
    return this.http.get(environment.apiUrl +'/api/Seller/GetSellers/0')
    .pipe(
      map((response: Seller[]) => {
        return response;
      })
    );
  }

  deleteSeller(id: Seller["code"]): Observable<Seller> {
    return this.http.get(environment.apiUrl +'/api/Seller/DeleteSeller/'+ id)
    .pipe(
      map((response: Seller) => {
        this.seller = response;
        return this.seller;
      })
    );
  }
}
