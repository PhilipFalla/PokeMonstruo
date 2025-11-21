import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Shopify } from '../../services/shopify';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-carousel.html',
  styleUrls: ['./featured-carousel.css']
})
export class FeaturedCarousel implements OnInit {
  items: any[] = [];

  constructor(private shopifyService: Shopify) {}

  ngOnInit() {
    this.shopifyService.getProducts().subscribe(data => {
      this.items = data;
    });
  }
}