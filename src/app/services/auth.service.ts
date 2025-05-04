// src/app/services/auth.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenSignal = signal<string | null>(localStorage.getItem('jwtToken'));
  private baseUrl = ' http://localhost:4200/'; // Update to your real API

  constructor(private http: HttpClient) {}

  register(user: any) {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  login(credentials: any) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('jwtToken', response.token);
        this.tokenSignal.set(response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.tokenSignal.set(null);
  }

  token = computed(() => this.tokenSignal());

  isAuthenticated = computed(() => !!this.tokenSignal());
}
