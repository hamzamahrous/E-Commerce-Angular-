import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { type cart } from '../cart/cart-type';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private httpClient = inject(HttpClient);
  constructor() {}

  sendNewCart(cart: cart) {
    return this.httpClient.post('https://fakestoreapi.com/carts', cart);
  }
}
