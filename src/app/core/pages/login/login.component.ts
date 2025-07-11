import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;
  apiError: string = '';
  isLoading: boolean = false;

  _formBuilder = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^[A-Z].{4,8}$/)]]
    });
  }
  getControl(name:string) {
    return this.loginForm.get(name)
  }

  login() {
    if (this.loginForm.valid) {
      this.apiError = ''; // Reset error message

      
      this._authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login Success:', response);
          localStorage.setItem('itiToken', response.token);
          this._authService.saveUser(); // Store user data in service
          // Navigate to dashboard or home
          this._router.navigate(['/home']);
        },
        error: (error) => {
          console.log('Login Error:', error);
          this.apiError = error.error?.message 
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
