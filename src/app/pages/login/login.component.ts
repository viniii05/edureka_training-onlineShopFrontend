import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isSubmitting = false;
  error = '';
  success = '';

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.error = 'Please fix validation errors and try again.';
      return;
    }

    this.isSubmitting = true;

    const creds = this.loginForm.value;  

    this.authService.loginWithCredentials(creds).subscribe({
      next: (res) => {
        console.log('Login successful', res);
        this.success = 'Login successful ✅';
        this.loginForm.reset();
        this.router.navigate(['products']); 
      },
      error: (err) => {
        console.error('Login failed', err);
        const apiMsg = err?.error?.message || err?.message;
        this.error = apiMsg ? `Login failed: ${apiMsg}` : 'Login failed ❌';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
