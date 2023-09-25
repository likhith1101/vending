// vending-machine.service.ts
import { Injectable } from '@angular/core';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class VendingMachineService {
  private products: Product[] = [
    // Your product data here
  ];

  private selectedProducts: Product[] = [];

  openDoor(productId: string): void {
    const product = this.products.find((p) => p.id === productId);

    if (product && product.quantity > 0) {
      product.quantity--;

      // Add the selected product to the list
      const selectedProduct: Product = { ...product, quantity: 1 };
      this.selectedProducts.push(selectedProduct);
    }
  }

  closeDoor(selectedProducts: Product[]): void {
    // Calculate the total bill based on the selected products
    const totalBill = this.calculateBill(selectedProducts);

    // Reset selected products and total bill
    this.selectedProducts = [];
    // You can use the totalBill variable as needed in your application.
  }

  calculateBill(selectedProducts: Product[]): number {
    return selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  }

  getSelectedProducts(): Product[] {
    return this.selectedProducts;
  }
}
