import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private httpClient = inject(HttpClient);
  constructor() {}

  getAllCarts(dateParams: { start: string; end: string }) {
    let parameters = new HttpParams();
    parameters = parameters
      .append('startDate', dateParams?.start)
      .append('endDate', dateParams?.end);
    return this.httpClient.get('https://fakestoreapi.com/carts', {
      params: parameters,
    });
  }

  deleteCart(id: number) {
    return this.httpClient.delete('https://fakestoreapi.com/carts' + id);
  }
}
