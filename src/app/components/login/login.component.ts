import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Redirect to home if already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  // Getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Detenerse si el formulario no es válido
    if (this.loginForm.invalid) {
      // Resaltar los errores en los campos del formulario
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsDirty();
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;
    this.error = '';

    const { email, password, rememberMe } = this.loginForm.value;

    this.authService.login(email, password, rememberMe).subscribe(
      (user) => {
        console.log('Login exitoso:', user);
        // Redirigir al usuario a la página principal después del login
        this.router.navigate(['/']);
      },
      (error) => {
        // Manejar diferentes tipos de errores de autenticación
        if (error.status === 401) {
          this.error = 'Credenciales inválidas. Por favor, verifique su correo y contraseña.';
        } else if (error.status === 429) {
          this.error = 'Demasiados intentos fallidos. Por favor, inténtelo nuevamente más tarde.';
        } else if (error.error?.message) {
          this.error = error.error.message;
        } else {
          this.error = 'Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.';
        }
        
        console.error('Error de inicio de sesión:', error);
        this.loading = false;
      }
    );
  }
}
