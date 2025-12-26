import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './otp-verification.html',
  styleUrls: ['./otp-verification.css']
})
export class OtpVerificationComponent implements OnInit {
  otpForm!: FormGroup;
  isSubmitting = false;
  error = '';
  success = '';
  email: string = '';

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';

    if (!this.email) {
      this.error = 'Email is not available. Please try again.';
      return;
    }

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  get otp() { return this.otpForm.get('otp'); }

  onSubmit(): void {
  this.error = '';
  this.success = '';

  if (this.otpForm.invalid) {
    this.otpForm.markAllAsTouched();
    this.error = 'Please enter a valid OTP';
    return;
  }

  this.isSubmitting = true;

  const payload = {
    email: this.email,
    otp: this.otpForm.value.otp
  };

  this.authService.verifyOtp(payload.email, payload.otp).subscribe({
    next: (res) => {
      this.success = res;  
      setTimeout(() => {
        this.router.navigate(['login']);
      }, 2000);
    },
    error: (err) => {
      console.error('Error during OTP verification:', err);
      this.error = 'OTP verification failed. Please try again.';
    },
    complete: () => {
      this.isSubmitting = false;
    }
  });
}

}
