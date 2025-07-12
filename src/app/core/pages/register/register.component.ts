//   registerForm :FormGroup = new FormGroup({
//     name: new FormControl('',[Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
//     email: new FormControl(null, [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z].{4,8}$/)]),
//     confirmPassword: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z].{4,8}$/)]),
//     address: new FormControl('', [Validators.required, Validators.minLength(5)]),
//     phone: new FormControl('', [Validators.required, Validators.pattern(/^(01)[0-2]\d{8}$/)]),
//   },
//   {validators: this.validateConfirmedPassword }
// )

import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

registerForm :FormGroup;
apiError: string = ''
_formBuilder = inject(FormBuilder)
_authService = inject(AuthService);
_router = inject(Router)

constructor() {
  this.registerForm = this._formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    email: [null, [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^[A-Z].{4,8}$/)]],
    confirmPassword: ['', [Validators.required, Validators.pattern(/^[A-Z].{4,8}$/)]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    phone: ['', [Validators.required, ]],
  }, { validators: this.validateConfirmedPassword });
}


  register() {
    console.log(this.registerForm);
    if(this.registerForm.valid) {
      // Api call
      this.apiError = ''; // Reset error message
      this._authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log(response);
          this._router.navigate(['/login']);
          // Handle success response
        },
        error: (error) => {
          // Handle error response
          this.apiError = error.error.message
          console.log(this.apiError);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  validateConfirmedPassword(form: AbstractControl){
    const password = form.get('password')?.value
    const confirmPassword = form.get('confirmPassword')?.value

    if(!password || !confirmPassword) return null; // If either field is empty, no error
    if(password == confirmPassword) return null; // Passwords match, no error

    if(password != confirmPassword) {
      form.get("confirmPassword")?.setErrors({misMatch: true});
    }

    return { misMatch: true }; // Passwords do not match, return error
  }
}


// {
//     "name":"amr",
//     "email":"amrtest@email.com",
//     "password":"O123",
//     "confirmPassword":"O123",
//     "address":"Cairo",
//     "phone":"01119035333"
// }
// habib
// habib@email.com
// O12345
