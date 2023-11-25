import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../shared/auth-button/auth-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, AuthButtonComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  msg: string = "";
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private authService: authService) { }
  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (e) => {
          console.log(e)
        },
        error: (e) => {
          console.log(e)
        }
      })
    }
  }
}
