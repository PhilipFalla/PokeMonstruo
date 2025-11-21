// src/app/pages/cart/cart.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import { FormsModule } from '@angular/forms';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderNav, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  cartItems: CartItem[] = [
    { id: 1, name: 'Producto 1', price: 99.0, qty: 2, image: '/assets/product1.avif' },
    { id: 2, name: 'Producto 2', price: 120.0, qty: 1, image: '/assets/product2.avif' },
  ];

  constructor(private router: Router) {}

  removeItem(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }

  updateQty(item: CartItem, qty: number) {
    if (qty < 1) return;
    item.qty = qty;
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}