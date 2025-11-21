import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header-nav.html',
  styleUrl: './header-nav.css'
})
export class HeaderNav {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}