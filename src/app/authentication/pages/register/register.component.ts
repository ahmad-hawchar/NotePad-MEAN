import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthButtonComponent } from '../../shared/auth-button/auth-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { authService } from '../../services/authentication.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, AuthButtonComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  msg: string = "";
  success: boolean = false;
  e: string = ""
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    fullname: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private authService: authService, private router: Router) { }
  register() {
    if (this.registerForm.value.fullname && this.registerForm.valid && this.registerForm.value.email && this.registerForm.value.password) {
      this.authService.Register(this.registerForm.value.fullname, this.registerForm.value.email, this.registerForm.value.password).subscribe({
        next: (e: any) => {
          this.success = e.success
          this.msg = e.message
        },
        error: (e) => {
          this.success = e.success;
          this.msg = "we had a problem creating your account, Try again later!"
        }
      })
    }
  }
}
