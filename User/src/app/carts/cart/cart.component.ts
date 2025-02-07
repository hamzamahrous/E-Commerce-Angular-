import {
  Component,
  inject,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../products/product-type';
import { FormsModule } from '@angular/forms';
import { CartsService } from '../services/carts.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartsService);
  success = false;
  isLoading = false;
  cartProducts: { product: Product; quantity: number }[] = [];
  totalPrice: number = 0;

  ngOnInit(): void {
    this.getCartProducts();
  }

  getCartProducts() {
    if ('cart' in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem('cart')!);
      console.log(this.cartProducts);
    }
    this.calcTotalPrice();
  }

  calcTotalPrice() {
    this.totalPrice = 0;
    for (let ind = 0; ind < this.cartProducts.length; ind++) {
      this.totalPrice +=
        this.cartProducts[ind].product.price * this.cartProducts[ind].quantity;
    }
  }

  incrementAmount(index: number) {
    this.cartProducts[index].quantity++;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calcTotalPrice();
  }

  decrementAmount(index: number) {
    if (this.cartProducts[index].quantity > 0) {
      this.cartProducts[index].quantity--;
      localStorage.setItem('cart', JSON.stringify(this.cartProducts));
      this.calcTotalPrice();
    }
  }

  onInputChange(index: number, enteredQuantity: number) {
    if (enteredQuantity > 0) {
      this.cartProducts[index].quantity = enteredQuantity;
    } else {
      this.cartProducts[index].quantity = 0;
    }

    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calcTotalPrice();
  }
  onProductDelete(index: number) {
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calcTotalPrice();
  }

  clearCart() {
    this.cartProducts.length = 0;
    localStorage.setItem('cart', JSON.stringify(this.cartProducts));
    this.calcTotalPrice();
  }

  sendCart() {
    this.isLoading = true;
    let products = this.cartProducts.map((product) => {
      return { productId: product.product.id, quantity: product.quantity };
    });

    this.cartService
      .sendNewCart({
        userId: 5,
        date: new Date(),
        products: products,
      })
      .subscribe((res) => {
        this.isLoading = false;
        this.success = true;
        this.clearCart();
      });
  }
}
