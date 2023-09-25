import { Component } from '@angular/core';
import { Product } from '../product.model';
import { VendingMachineService } from '../vending-machine.service';

@Component({
  selector: 'app-vending-machine',
  templateUrl: './vending-machine.component.html',
  styleUrls: ['./vending-machine.component.css'],
})
export class VendingMachineComponent {
  constructor(private vendingMachineService: VendingMachineService) {}

  productId = '';
  totalBill = 0;
  selectedProducts: Product[] = [];

  // Define the available sections with their products
  availableSections: {
    sectionName: string;
    products: Product[];
  }[] = [
    {
      sectionName: 'Section A',
      products: [
        { id: 'A1', name: 'Kurkure', price: 10, quantity: 10 },
        { id: 'A2', name: 'Lays', price: 20, quantity: 8 },
      ],
    },
    {
      sectionName: 'Section B',
      products: [
        { id: 'B1', name: 'Hide&seek', price: 30, quantity: 12 },
        { id: 'B2', name: 'Bourbon', price: 25, quantity: 7 },
      ],
    },
    {
      sectionName: 'Section C',
      products: [
        { id: 'C1', name: 'frooti', price: 10, quantity: 15 },
        { id: 'C2', name: 'thumbsup', price: 20, quantity: 5 },
      ],
    },
  ];

  openDoor(): void {
    // Find the product within the selected section
    let selectedProduct: Product | undefined;
    let selectedSectionName = '';

    for (const section of this.availableSections) {
      selectedProduct = section.products.find((p) => p.id === this.productId);

      if (selectedProduct) {
        selectedSectionName = section.sectionName;
        break;
      }
    }

    if (selectedProduct && selectedProduct.quantity > 0) {
      // Deduct one item from the available quantity
      selectedProduct.quantity--;

      // Add the selected product to the list
      const productToAdd: Product = { ...selectedProduct, quantity: 1 };
      this.selectedProducts.push(productToAdd);

      // Calculate the total bill
      this.totalBill = this.vendingMachineService.calculateBill(this.selectedProducts);
    } else {
      // Handle product not found or out of stock
      console.log(`Product with ID '${this.productId}' not found in ${selectedSectionName}.`);
    }
  }

  closeDoor(): void {
    // Pass the selected products to the service for calculating the bill
    this.vendingMachineService.closeDoor(this.selectedProducts);

    // Clear the selected products and reset the total bill
    this.selectedProducts = [];
    this.totalBill = 0;
  }
}
