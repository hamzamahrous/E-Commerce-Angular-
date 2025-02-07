import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { Product } from '../product-type';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CurrencyPipe, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  private router = inject(Router);
  @Input({ required: true }) product!: Product;
  @Output() itemAdded = new EventEmitter();
  @ViewChild('inputField') amountInput!: ElementRef<HTMLInputElement>;
  amount = signal('0');
  addButton: boolean = false;

  addToCart() {
    this.itemAdded.emit({ product: this.product, quantity: this.amount() });
    this.addButton = false;
    if (this.amountInput && this.amountInput.nativeElement) {
      this.amount.set('0');
    }
  }

  loadProductDetails() {
    this.router.navigate(['/details', this.product.id]);
  }
}
