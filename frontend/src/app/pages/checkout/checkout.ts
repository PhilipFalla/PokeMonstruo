import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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

  userId = 'replace-with-logged-in-user-id'; // from auth

  constructor(private router: Router, private http: HttpClient) {}

  pay() {
    // Simple validation
    if (!this.name || !this.phone || !this.address || !this.cardNumber || !this.cardHolder || !this.expiryDate || !this.cvv) {
      alert('Por favor completa todos los campos antes de continuar.');
      return;
    }

    // Create order object
    const order = {
      userId: this.userId,
      items: [], // ideally you fetch items from cart API
      shipping: {
        recipientName: this.name,
        phone: this.phone,
        address: this.address,
        instructions: this.instructions
      },
      payment: {
        cardHolder: this.cardHolder,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv
      }
    };

    // Save order to backend
    this.http.post(`/api/orders/create`, order).subscribe({
      next: () => {
        alert(`Pago procesado correctamente! Gracias, ${this.name}.`);
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Failed to create order', err);
        alert('Hubo un error al procesar tu pago.');
      }
    });
  }
}