import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.css'
})
export class HeaderNav {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService, private router: Router) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  goToCart() {
    this.authService.isLoggedIn$.pipe(take(1)).subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigate(['/cart']);
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }
}