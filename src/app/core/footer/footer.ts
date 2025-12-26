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
  currentYear: number = new Date().getFullYear();

  socialLinks = {
    instagram: 'https://instagram.com/shopin',
    facebook: 'https://facebook.com/shopin',
    x: 'https://x.com/shopin'
  };

  paymentMethods = [
    { name: 'Visa', class: 'visa' },
    { name: 'Mastercard', class: 'mastercard' },
    { name: 'RuPay', class: 'rupay' },
    { name: 'Paytm', class: 'paytm' }
  ];
}
