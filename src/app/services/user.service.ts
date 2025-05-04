import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private emailSubject = new BehaviorSubject<string | null>(
    this.isBrowser ? localStorage.getItem('email') : null
  );

  email$ = this.emailSubject.asObservable();

  setEmail(email: string): void {
    if (this.isBrowser) {
      localStorage.setItem('email', email);
    }
    this.emailSubject.next(email);
  }

  clearEmail(): void {
    if (this.isBrowser) {
      localStorage.removeItem('email');
    }
    this.emailSubject.next(null);
  }

  getEmail(): string | null {
    return this.emailSubject.value;
  }
}
