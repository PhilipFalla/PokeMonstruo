import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shopify } from '../../services/shopify';

@Component({
  selector: 'app-new-products-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './new-products-carousel.html',
  styleUrls: ['./new-products-carousel.css']
})
export class NewProductsCarousel implements OnInit {
  items: any[] = [];

  constructor(private shopifyService: Shopify) {}

  ngOnInit() {
    this.shopifyService.getProducts().subscribe(data => {
      this.items = data;
    });
  }
}
