
// src/app/signup/signup.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  isSubmitting = false;
  error = '';
  success = '';

  // Inject via functional inject() for standalone best practice
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          // letters, spaces, hyphens, apostrophes
          Validators.pattern(/^[A-Za-z][A-Za-z\s\-’']{1,49}$/)
        ]
      ],
      mobile: [
        '',
        [
          Validators.required,
          // 10 digits typical Indian mobile format, adjust if needed
          Validators.pattern(/^\d{10}$/)
        ]
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // at least one upper, one lower, one digit, one special
          Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]|\\;:'",.<>\?/\-]).{8,}$/)
        ]
      ]
    });
  }

  // Convenience getters for template
  get fullname() { return this.signupForm.get('fullname'); }
  get mobile() { return this.signupForm.get('mobile'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  signUp(): void {
    this.error = '';
    this.success = '';

    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.error = 'Please fix validation errors and try again.';
      return;
    }

    this.isSubmitting = true;

    // Adjust backend URL per your environment
    const url = 'http://localhost:3000/signupUsers';
    const payload = this.signupForm.value;

    this.http.post<any>(url, payload).subscribe({
      next: (res) => {
        this.success = 'Signup successful ✅';
        this.signupForm.reset();
        // Navigate to login
        this.router.navigate(['login']);
      },
      error: (err) => {
        console.error('Signup error:', err);
        const apiMsg = err?.error?.message || err?.message;
        this.error = apiMsg ? `Signup failed: ${apiMsg}` : 'Signup failed ❌';
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
