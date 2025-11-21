import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import shared UI components
import { HeaderNav } from '../shared/header-nav/header-nav';
import { FeaturedCarousel } from '../shared/featured-carousel/featured-carousel';
import { NewProductsCarousel } from '../shared/new-products-carousel/new-products-carousel';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeaderNav,
    FeaturedCarousel,
    NewProductsCarousel,
    Footer
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {

}