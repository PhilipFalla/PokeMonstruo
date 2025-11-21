import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule, 
    HeaderNav,
    Footer
  ],
  templateUrl: './products-list.html',
})
export class ProductsListComponent {

  category = '';
  title = '';

  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') || '';
      this.title = this.mapCategoryToTitle(this.category);

      // HERE you would load products from API depending on category
      // this.productService.getByCategory(this.category).subscribe(...)
    });
  }

  mapCategoryToTitle(category: string): string {
    switch (category) {
      case 'sellado': return 'Producto Sellado';
      case 'singles': return 'Singles';
      case 'accesorios': return 'Accesorios';
      case 'sobres': return 'Sobres Sueltos';
      default: return 'Productos';
    }
  }
}