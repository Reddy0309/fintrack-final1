import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  showError = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.http.get<any[]>('http://localhost:3000/users').subscribe({
      next: (users) => {
        const matchedUser = users.find(user =>
          user.email === email && bcrypt.compareSync(password, user.password)
        );

        if (matchedUser) {
          localStorage.setItem('email', matchedUser.email);
          localStorage.setItem('user', JSON.stringify(matchedUser));
          this.userService.setEmail(matchedUser.email);
          this.router.navigate(['/dashboard']);
        } else {
          this.showError = true;
        }
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
