import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Store logged-in state
  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn$.asObservable();

  // Store user email for display or future use
  private userEmail$ = new BehaviorSubject<string | null>(null);
  userEmail = this.userEmail$.asObservable();

  login(email: string) {
    this.loggedIn$.next(true);
    this.userEmail$.next(email);
  }

  logout() {
    this.loggedIn$.next(false);
    this.userEmail$.next(null);
  }
}