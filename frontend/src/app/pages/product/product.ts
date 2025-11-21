import { Component, OnInit } from '@angular/core';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { HeaderNav } from '../../shared/header-nav/header-nav';
import { FeaturedCarousel } from '../../shared/featured-carousel/featured-carousel';
import { Footer } from '../../shared/footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../../app.config';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HeaderNav, FeaturedCarousel, Footer],
  templateUrl: './product.html',
  styleUrl: './product.css'
})
export class ProductComponent implements OnInit {
  productId!: string;
  qty = 1;
  isLoggedIn$: Observable<boolean>;

  product = {
    productId: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    language: '',
  };

  // Hardcoded user for now
  userId = '69205dee72f65322c5f48d3f';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];

    // TODO: Replace with real product fetch
    this.product = {
      productId: this.productId,
      name: `Producto ${this.productId}`,
      description: 'This is a detailed description of the product.',
      price: 99.00,
      image: '/assets/product-placeholder.avif',
      language: 'English'
    };
  }

  addToCart() {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(loggedIn => {
      if (!loggedIn) {
        this.router.navigate(['/auth']);
        return;
      }

      const payload = {
        productId: this.product.productId,
        name: this.product.name,
        price: this.product.price,
        image: this.product.image,
        quantity: this.qty
      };

      this.http.post(`${BACKEND_URL}/api/cart/${this.userId}/add`, payload)
        .subscribe({
          next: () => {
            alert(`Added ${this.qty} of "${this.product.name}" to your cart!`);
          },
          error: (err) => {
            console.error('Failed to add to cart', err);
            alert('Error adding item to cart.');
          }
        });
    });
  }
}