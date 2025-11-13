import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // Form já inicializado no construtor
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailError(): string {
    if (
      (this.email?.hasError('required') || this.email?.hasError('email')) &&
      this.email?.touched
    ) {
      return 'Por favor, digite seu usuário (e-mail de cadastro)!';
    }

    return '';
  }

  getPasswordError(): string {
    if (this.password?.hasError('required') && this.password?.touched) {
      return 'Digite uma senha';
    }
    return '';
  }

  getErrors(): string {
    if (this.getEmailError().length > 0 || this.getPasswordError().length > 0) {
      return 'Dados incorretos. Por favor, revise seus dados e tente novamente';
    }

    return '';
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const credentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    this.authService.login(credentials).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token);

        this.router.navigate(['/entidades']);
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;

        // Tratar erros específicos do backend
        if (error.status === 401) {
          this.errorMessage =
            'Senha ou usuário incorretos, revise suas credenciais!';
        } else if (error.status === 422) {
          if (error.error.errors) {
            const errors = error.error.errors;
            if (errors.email) {
              this.email?.setErrors({ backend: errors.email[0] });
            }
            if (errors.password) {
              this.password?.setErrors({ backend: errors.password[0] });
            }
          }
        } else {
          this.errorMessage = 'Erro ao fazer login. Tente novamente.';
        }
      },
    });
  }
}
