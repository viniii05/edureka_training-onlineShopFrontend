// src/app/components/footer/footer.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // Current year for copyright (auto-updates)
  currentYear: number = new Date().getFullYear();

  // Social media links (easy to customize)
  socialLinks = {
    instagram: 'https://instagram.com/shopin',
    facebook: 'https://facebook.com/shopin',
    x: 'https://x.com/shopin'
  };

  // Payment methods display
  paymentMethods = [
    { name: 'Visa', class: 'visa' },
    { name: 'Mastercard', class: 'mastercard' },
    { name: 'RuPay', class: 'rupay' },
    { name: 'Paytm', class: 'paytm' }
  ];
}
