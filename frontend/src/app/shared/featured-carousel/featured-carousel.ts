import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-featured-carousel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './featured-carousel.html',
  styleUrl: './featured-carousel.css',
})
export class FeaturedCarousel {
  @Input() items: any[] = [];
}