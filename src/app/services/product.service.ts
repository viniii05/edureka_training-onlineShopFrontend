// import { Injectable } from '@angular/core';
// import { Product } from '../models/product.model';

// @Injectable({ providedIn: 'root' })
// export class ProductService {

//   private products: Product[] = [
//     { id: 1, name: 'Laptop', price: 55000, description: 'High performance laptop' },
//     { id: 2, name: 'Mobile', price: 30000, description: 'Latest Android phone' },
//     { id: 3, name: 'Headphones', price: 2500, description: 'Noise cancelling headphones' },
//     { id: 4, name: 'Keyboard', price: 1500, description: 'Mechanical keyboard' },
//     { id: 5, name: 'Mouse', price: 800, description: 'Wireless mouse' }
//   ];

//   getProducts() {
//     return this.products;
//   }

//   getProductById(id: number) {
//     return this.products.find(p => p.id === id);
//   }
// }

// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'; // Assuming you have a Product model defined

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://dummyjson.com/products'; // Assuming your API URL is like this

  constructor(private http: HttpClient) { }
  imageUrl: any;
  // Fetch all products from the API
  // getProducts(): Observable<Product[]> {
  //   return this.http.get<Product[]>(this.apiUrl);
  // }
  getProducts(): Observable<Product[]> {
    return new Observable((observer) => {
      fetch(this.apiUrl)
        .then(response => response.json())
        .then(data => {
          observer.next(data.products); // data.products should contain the list of products
          observer.complete();
        })
        .catch(err => {
          observer.error(err);
        });
    })};

  // Fetch a specific product by id
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}

