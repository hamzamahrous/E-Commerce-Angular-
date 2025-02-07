import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../product-type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}
  httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products');
  }

  getAllCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(
      'https://fakestoreapi.com/products/categories'
    );
  }

  getProductsCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(
      'https://fakestoreapi.com/products/category/' + category
    );
  }

  getProductDetails(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(
      'https://fakestoreapi.com/products/' + productId
    );
  }

  sendNewProduct(model: any) {
    return this.httpClient.post('https://fakestoreapi.com/products', model);
  }
}
