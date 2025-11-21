import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import { FormsModule } from '@angular/forms';
import { BACKEND_URL } from '../../app.config';

interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderNav, Footer],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  userId = '69205dee72f65322c5f48d3f'; // hardcoded user _id

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.http.get<any>(`${BACKEND_URL}/api/cart/${this.userId}`)
      .subscribe(res => {
        this.cartItems = res.items || [];
      });
  }

  removeItem(item: CartItem) {
    this.http.post(`${BACKEND_URL}/api/cart/${this.userId}/remove`, { productId: item.productId })
      .subscribe(() => {
        this.cartItems = this.cartItems.filter(i => i.productId !== item.productId);
      });
  }

  updateQty(item: CartItem, qty: number) {
    if (qty < 1) return;
    item.quantity = qty;

    // Optional: sync with backend
    this.http.post(`${BACKEND_URL}/api/cart/${this.userId}/add`, {
      productId: item.productId,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: qty
    }).subscribe();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  proceedToCheckout() {
    this.router.navigate(['/checkout']);
  }
}