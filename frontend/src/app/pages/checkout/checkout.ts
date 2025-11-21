import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderNav, Footer],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
  // Shipping info
  name = '';
  phone = '';
  address = '';
  instructions = '';

  // Payment info
  cardNumber = '';
  cardHolder = '';
  expiryDate = '';
  cvv = '';

  constructor(private router: Router) {}

  pay() {
    // Simple validation
    if (!this.name || !this.phone || !this.address || !this.cardNumber || !this.cardHolder || !this.expiryDate || !this.cvv) {
      alert('Please fill out all fields before proceeding.');
      return;
    }

    // Simulate payment
    alert(`Payment processed successfully! Thank you, ${this.name}.`);

    // Redirect to home
    this.router.navigate(['/']);
  }
}