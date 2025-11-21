import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [
  { path: '', component: Home },
  {
    path: 'productos/:category',
    loadComponent: () =>
      import('./pages/products-list/products-list')
        .then(m => m.ProductsListComponent)
  }
];