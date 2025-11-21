import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-products-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-products-carousel.html',
  styleUrl: './new-products-carousel.css',
})
export class NewProductsCarousel {
  @Input() items: any[] = [];
}
