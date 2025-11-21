// src/app/services/shopify.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../app.config';

@Injectable({ providedIn: 'root' })
export class Shopify {
  private apiUrl = `${BACKEND_URL}/api/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}