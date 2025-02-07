import { Routes } from '@angular/router';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/products-details/products-details.component';
import { CartComponent } from './carts/cart/cart.component';

export const routes: Routes = [
  { path: 'products', component: AllProductsComponent },
  { path: 'details/:productId', component: ProductsDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
