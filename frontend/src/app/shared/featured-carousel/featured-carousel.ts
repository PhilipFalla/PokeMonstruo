import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './featured-carousel.html',
  styleUrl: './featured-carousel.css',
})
export class FeaturedCarousel {
  @Input() items: any[] = [];
}
