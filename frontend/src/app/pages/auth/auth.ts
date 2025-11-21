import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HeaderNav } from '../../shared/header-nav/header-nav';
import { Footer } from '../../shared/footer/footer';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [HeaderNav, Footer, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthComponent {
  isLoginMode = true;
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private authService: AuthService) {}

  switchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.isLoginMode) {
      if (!this.email.trim() || !this.password.trim()) {
        alert('Por favor completa todos los campos');
        return;
      }
    } else {
      if (!this.email.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
        alert('Por favor completa todos los campos');
        return;
      }
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
    }

    // Mark as logged in
    this.authService.login(this.email);

    alert(`${this.isLoginMode ? 'Login' : 'Registro'} exitoso para ${this.email}!`);
    this.router.navigate(['/']);
  }
}
