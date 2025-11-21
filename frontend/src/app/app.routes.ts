import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AuthComponent } from './pages/auth/auth';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: AuthComponent },
  { path: 'productos/:category', loadComponent: () =>
      import('./pages/products-list/products-list').then(m => m.ProductsListComponent)
  },
  {
    path: 'producto/:id',
    loadComponent: () =>
      import('./pages/product/product')
        .then(m => m.ProductComponent)
  }
];
