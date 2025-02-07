import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { type Product } from '../product-type';
import { catchError, throwError } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  productsService = inject(ProductsService);
  showingAddProduct: boolean = false;
  editingProduct: boolean = false;
  products: Product[] = [];
  isLoading = false;
  keepCurrentImage: boolean = true;

  form = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    imageURL: new FormControl('', { validators: [Validators.required] }),
    price: new FormControl('', { validators: [Validators.required] }),
    category: new FormControl('', { validators: [Validators.required] }),
    Description: new FormControl('', { validators: [Validators.required] }),
  });

  editForm = new FormGroup({
    title: new FormControl('', { validators: [Validators.required] }),
    imageURL: new FormControl('', { validators: [Validators.required] }),
    price: new FormControl('', { validators: [Validators.required] }),
    category: new FormControl('', { validators: [Validators.required] }),
    Description: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    this.loadProducts();
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

  closeAddProduct() {
    this.showingAddProduct = false;
    this.editingProduct = false;
  }

  showAddProduct() {
    this.showingAddProduct = true;
  }

  addProduct() {
    let newProduct = this.form.value;
    this.productsService.sendNewProduct(newProduct).subscribe((res) => {
      console.log('The New Product Added Successfully');
    });
  }

  editProduct(product: Product) {
    this.editingProduct = true;

    // Prepopulate the form with the product's details
    this.editForm.get('title')?.setValue(product.title);
    this.editForm.get('price')?.setValue(product.price.toString());
    this.editForm.get('category')?.setValue(product.category);
    this.editForm.get('Description')?.setValue(product.description);

    // Handle the image URL logic
    this.keepCurrentImage = true; // Default to keeping the current image
    this.editForm.get('imageURL')?.setValue(product.image);
  }

  toggleKeepCurrentImage(event: Event) {
    this.keepCurrentImage = (event.target as HTMLInputElement).checked;
    if (this.keepCurrentImage) {
      // Reset the image URL to the current value
      const currentImageURL = this.editForm.get('imageURL')?.value || '';
      this.editForm.get('imageURL')?.setValue(currentImageURL);
    } else {
      // Clear the image URL for entering a new value
      this.editForm.get('imageURL')?.setValue('');
    }
  }

  saveEditedProduct() {
    const updatedProduct = this.editForm.value;

    if (this.keepCurrentImage) {
      console.log('Keeping current image:', updatedProduct.imageURL);
    } else {
      console.log('New image URL provided:', updatedProduct.imageURL);
    }

    // Pass the updated product to the service for saving
    // this.productsService.updateProduct(updatedProduct).subscribe((res) => {
    //   console.log('The Product was updated successfully.');
    // });
  }
}
