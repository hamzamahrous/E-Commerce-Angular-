import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { type Product } from '../product-type';
import { catchError, throwError } from 'rxjs';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';
import { ProductComponent } from '../product/product.component';
import { SelectComponent } from '../../shared/select/select.component';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [SpinnerComponent, ProductComponent, SelectComponent],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  products: Product[] = [];
  cart: { product: Product; quantity: number }[] = [];
  categories: string[] = [];
  isLoading = false;

  isOverflowing = false;
  isExpand = false;

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.isLoading = true;
    this.productsService
      .getAllCategories()
      .pipe(
        catchError((error) => {
          return throwError(() => {
            return new Error(
              'Something went wrong fetching the available categories. Please try again later.'
            );
          });
        })
      )
      .subscribe({
        next: (categoriesData) => {
          this.isLoading = false;
          this.categories = categoriesData;
        },
        error: (modifiedError) => {
          this.isLoading = false;
          console.log(modifiedError);
        },
      });
  }

  loadProducts() {
    this.isLoading = true;
    this.productsService
      .getAllProducts()
      .pipe(
        catchError((error) => {
          return throwError(() => {
            return new Error(
              'Something went wrong fetching the available products. Please try again later.'
            );
          });
        })
      )
      .subscribe({
        next: (productsData) => {
          this.isLoading = false;
          this.products = productsData;
        },
        error: (modifiedError) => {
          this.isLoading = false;
          console.log(modifiedError);
        },
      });
  }

  loadCategoryProducts(selectedCat: string) {
    this.isLoading = true;
    this.productsService
      .getProductsCategory(selectedCat)
      .pipe(
        catchError((error) => {
          return throwError(() => {
            return new Error(
              'Something went wrong fetching the available products. Please try again later.'
            );
          });
        })
      )
      .subscribe({
        next: (productsData) => {
          this.isLoading = false;
          this.products = productsData;
        },
        error: (modifiedError) => {
          this.isLoading = false;
          console.log(modifiedError);
        },
      });
  }

  onCategoryChange(selectedCat: any) {
    console.log(selectedCat);
    if (selectedCat == 'All') {
      this.loadProducts();
    } else {
      this.loadCategoryProducts(selectedCat);
    }
  }

  addItemToLocalStorage(event: { product: Product; quantity: number }) {
    if ('cart' in localStorage) {
      this.cart = JSON.parse(localStorage.getItem('cart')!);
      let exist = this.cart.find(
        (product) => product.product.id == event.product.id
      );
      if (exist) {
        alert('The product is already in your cart');
      } else {
        this.cart.push(event);
        localStorage.setItem('cart', JSON.stringify(this.cart));
      }
    } else {
      this.cart.push(event);
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }
}
