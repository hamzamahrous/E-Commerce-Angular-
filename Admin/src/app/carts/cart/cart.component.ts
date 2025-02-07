import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CartsService } from '../services/carts.service';
import { cart } from './cart-type';
import { DatePipe } from '@angular/common';
import { ProductsService } from '../../products/services/products.service';
import { Product } from '../../products/product-type';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, DatePipe, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartsService);
  private productsService = inject(ProductsService);
  carts: cart[] = [];
  cartDetails: any;
  productsInCart: Product[] = [];
  form = new FormGroup({
    start: new FormControl(''),
    end: new FormControl(''),
  });
  showingDetails: boolean = false;

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    const dateParams = {
      start: this.form.value.start || '',
      end: this.form.value.end || '',
    };

    this.cartService.getAllCarts(dateParams).subscribe((res: any) => {
      this.carts = res;
    });
  }

  deleteSomeCart(index: number) {
    this.carts.splice(index, 1);
  }

  applyFilter() {
    // console.log(this.form.value);
  }

  viewDetails(index: number) {
    this.productsInCart = [];
    this.cartDetails = this.carts[index];
    this.showingDetails = true;
    for (let productId in this.cartDetails.products) {
      this.productsService
        .getProductDetails(+productId + 1)
        .subscribe((res) => {
          this.productsInCart.push(res);
        });
    }
  }

  closeDetails() {
    this.showingDetails = false;
  }
}
