import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  currentUrl: string = '';
  userInitial: string = '';

  constructor(public router: Router, private userService: UserService,@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentUrl = event.url;
      });
  
    this.userService.email$.subscribe(email => {
      this.setUserInitial(email);
    });
  
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('email');
      this.setUserInitial(email);
    }
  }
  

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
    this.userService.clearEmail();
    this.router.navigate(['/']);
  }
  

  shouldShowAvatarAndLogout(): boolean {
    const hideOnRoutes = ['/', '/login', '/register', '/forgot-password'];
    return !hideOnRoutes.includes(this.currentUrl);
  }

  setUserInitial(email: string | null) {
    if (email && email.length > 0) {
      this.userInitial = email.charAt(0).toUpperCase();
    }
  }
}
