import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../product-type';
import { ProductsService } from '../services/products.service';
import { SpinnerComponent } from '../../shared/spinner/spinner.component';

@Component({
  selector: 'app-products-details',
  standalone: true,
  imports: [SpinnerComponent],
  templateUrl: './products-details.component.html',
  styleUrl: './products-details.component.css',
})
export class ProductsDetailsComponent implements OnInit {
  isLoading: boolean = false;
  @Input() productId!: number;
  product: Product | undefined;
  private productsService = inject(ProductsService);

  ngOnInit(): void {
    this.isLoading = true;
    this.productsService.getProductDetails(this.productId).subscribe({
      next: (productItem) => {
        this.isLoading = false;
        this.product = productItem;
      },
      error: (err) => {
        this.isLoading = false;
        console.error(
          'An error happened during fetching the product details',
          err
        );
      },
    });
  }
}
