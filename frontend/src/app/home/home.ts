import { Component } from '@angular/core';

// Import shared UI components
import { HeaderNav } from '../shared/header-nav/header-nav';
import { FeaturedCarousel } from '../shared/featured-carousel/featured-carousel';
import { NewProductsCarousel } from '../shared/new-products-carousel/new-products-carousel';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderNav,
    FeaturedCarousel,
    NewProductsCarousel,
    Footer
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  // Mock Featured Products
  featuredProducts = [
    {
      name: 'Booster Box – Paldea Evolved',
      price: 120,
      image: 'assets/mock/paldea-evolved.jpg'
    },
    {
      name: 'Elite Trainer Box – Obsidian Flames',
      price: 55,
      image: 'assets/mock/etb-obsidian.jpg'
    },
    {
      name: 'Booster Pack – Temporal Forces',
      price: 6,
      image: 'assets/mock/temporal-forces-pack.jpg'
    }
  ];

  // Mock New Products
  newProducts = [
    {
      name: 'Charizard ex (Full Art)',
      price: 35,
      image: 'assets/mock/charizard-ex.jpg'
    },
    {
      name: 'Pikachu Illustration Rare',
      price: 18,
      image: 'assets/mock/pikachu-ir.jpg'
    },
    {
      name: 'Greninja Promo',
      price: 12,
      image: 'assets/mock/greninja.jpg'
    }
  ];
}