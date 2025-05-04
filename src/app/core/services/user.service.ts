import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'  // So it's available everywhere automatically
})
export class UserService {
  private emailSubject = new BehaviorSubject<string | null>(localStorage.getItem('email'));
  
  // Other components can subscribe to this
  email$ = this.emailSubject.asObservable();

  // Call this after login
  setEmail(email: string) {
    localStorage.setItem('email', email);
    this.emailSubject.next(email);
  }

  // Call this after logout
  clearEmail() {
    localStorage.removeItem('email');
    this.emailSubject.next(null);
  }
}
