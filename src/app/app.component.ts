import { Component } from '@angular/core';
import { CategoryService } from './category.service';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  products: any[] = []; // Stores the full product list
  filteredProducts: any[] = []; // Stores the filtered product list
  searchTerm: string = ''; // Holds user input
  searchTimeout: any; // Holds timeout reference for debouncing

  constructor(private productService: CategoryService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = [...data]; // Ensuring immutability
      this.filteredProducts = [...data];
    });
  }

  filterProducts(): void {
    clearTimeout(this.searchTimeout); // Clear previous timeout if user is still typing

    this.searchTimeout = setTimeout(() => {
      if (this.searchTerm.trim() === '') {
        this.filteredProducts = [...this.products]; // Reset if search is empty
      } else {
        this.filteredProducts = this.products.filter(product =>
          product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) // Search by description too
        );
      }
    }, 300); // 300ms delay to prevent excessive function calls
  }
}
