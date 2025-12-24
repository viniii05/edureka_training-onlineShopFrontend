
// src/app/forgot-password/forgot-password.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  success = '';
  error = '';

  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() { return this.form.get('email'); }

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.error = 'Please enter a valid email.';
      return;
    }

    this.isSubmitting = true;

    const email = this.form.value.email;

    // TODO: Integrate with your AuthService: requestPasswordReset(email)
    // Example:
    // this.authService.requestPasswordReset(email).subscribe({
    //   next: () => { this.success = 'If the email exists, a reset link has been sent ✅'; },
    //   error: (err) => { this.error = err?.error?.message || 'Failed to send reset link ❌'; },
    //   complete: () => { this.isSubmitting = false; }
    // });

    // Temporary demo behavior
    setTimeout(() => {
      this.success = 'If the email exists, a reset link has been sent ✅';
      this.isSubmitting = false;
    }, 800);
  }
}
