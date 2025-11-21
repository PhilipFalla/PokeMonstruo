// src/app/pages/product/product.ts
import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HeaderNav } from '../../shared/header-nav/header-nav';
import { FeaturedCarousel } from '../../shared/featured-carousel/featured-carousel';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderNav, FeaturedCarousel, Footer],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent {
  productId!: string;
  qty = 1;

  product = {
    name: '',
    description: '',
    price: 0,
    image: '',
    language: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];

    // TODO: Replace with a service call to fetch the product
    this.product = {
      name: `Producto ${this.productId}`,
      description: 'This is a detailed description of the product.',
      price: 99.00,
      image: '/assets/product-placeholder.avif',
      language: 'English'
    };
  }

  addToCart() {
    if (this.qty < 1) {
      alert('Please select a valid quantity');
      return;
    }
    console.log(`Added ${this.qty} of ${this.product.name} to cart`);
  }
}