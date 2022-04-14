import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from './consts/api.config';

export interface ILatest {
  success: boolean,
  timestamp : number,
  base : string,
  date : string,
  rates: {}
}

@Injectable({
  providedIn: 'root'
})
export class FixerService {

  constructor( private readonly http: HttpClient ) { }

  getLatest() {
    return this.http.get(`http://data.fixer.io/api/latest?access_key=${API_KEY}`);
  }

//   convert(from: string, to: string, amount: number) {
//     return this.http.get(`http://data.fixer.io/api/convert?access_key=f20d26b52cc33d873f6752c790415717&from=${from}&to=${to}&amount=${amount}`);
//   }
}
