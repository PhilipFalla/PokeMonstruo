import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNav, Footer],
  templateUrl: './products-list.html',
})
export class ProductsListComponent implements OnInit {
  category = '';
  title = 'Productos';
  products = [
    { id: 1, name: 'Producto 1', price: 99.0, image: '/assets/product1.avif' },
    { id: 2, name: 'Producto 2', price: 120.0, image: '/assets/product2.avif' },
    { id: 3, name: 'Producto 3', price: 75.0, image: '/assets/product3.avif' },
    { id: 4, name: 'Producto 4', price: 200.0, image: '/assets/product4.avif' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.title = this.mapCategoryToTitle(this.category);

      // TODO: load products dynamically per category
      // this.productService.getByCategory(this.category).subscribe(...)
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