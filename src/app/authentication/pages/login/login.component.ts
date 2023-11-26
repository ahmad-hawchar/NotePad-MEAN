import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../shared/auth-button/auth-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private authService: authService, private router: Router) { }
  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.Login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
        next: (e) => {
          if (e.message == "WrongInputs") {
            this.msg = "email/password combo is wrong!"
          }
          else if (e.message == "giveAccess") {
            this.router.navigateByUrl("")
          }
        },
        error: (e) => {
          this.msg = "we had a problem logging you in, Try again later!"
        }
      })
    }
  }
}
