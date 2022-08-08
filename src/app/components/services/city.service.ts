import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  city: City = {
    code: 0,
    description: ''
  }
  constructor(private http: HttpClient) { }

  createEditCity(city: City): Observable<any[]> {
    return this.http.post(environment.apiUrl +'/api/City/CreateEditCity', city)
    .pipe(
      map((response: any[]) => {
        return response;
      })
    );
  }

  getCities(): Observable<City[]> {
    return this.http.get(environment.apiUrl +'/api/City/GetCities')
    .pipe(
      map((response: City[]) => {
        return response;
      })
    );
  }

  deleteCity(id: City["code"]): Observable<City> {
    return this.http.get(environment.apiUrl +'/api/City/DeleteCity/'+ id)
    .pipe(
      map((response: City) => {
        this.city = response;
        return this.city;
      })
    );
  }
}
