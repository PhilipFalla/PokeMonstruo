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
import { Shopify } from '../../services/shopify';

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
    private http: HttpClient,
    private shopify: Shopify
  ) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit() {
    this.productId = this.route.snapshot.params['id'];

    this.shopify.getProducts().subscribe({
      next: (products: any[]) => {
        const p = products.find(prod => prod.id === this.productId);

        if (!p) {
          console.error('Product not found for id', this.productId);
          this.router.navigate(['/']); // or show an error page
          return;
        }

        this.product = {
          productId: p.id,
          name: p.title,            // backend uses "title"
          description: p.description,
          price: p.price,
          image: p.image,           // this should be your real image path
          language: 'English'       // or any field you want
        };
      },
      error: err => {
        console.error('Failed to load products', err);
        this.router.navigate(['/']);
      }
    });
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

      this.http.post(`http://localhost:3000/api/cart/${this.userId}/add`, payload)
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