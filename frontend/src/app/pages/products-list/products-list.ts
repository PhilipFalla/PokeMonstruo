import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import { Shopify } from '../../services/shopify';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNav, Footer],
  templateUrl: './products-list.html',
})
export class ProductsListComponent implements OnInit {
  category = '';
  title = 'Productos';
  products: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private shopifyService: Shopify
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.title = this.mapCategoryToTitle(this.category);

      // Fetch products from backend
      this.shopifyService.getProducts().subscribe(data => {
        // If you want to filter by category locally:
        // this.products = data.filter(p => p.category === this.category);
        this.products = data;
      });
    });
  }

  private mapCategoryToTitle(category: string): string {
    switch (category) {
      case 'sellado': return 'Producto Sellado';
      case 'singles': return 'Singles';
      case 'accesorios': return 'Accesorios';
      case 'sobres': return 'Sobres Sueltos';
      default: return 'Productos';
    }
  }
}