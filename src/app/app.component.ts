import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router } from '@angular/router';

import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'portfolio-tracker';
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
}
