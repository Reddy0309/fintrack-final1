import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { REGEX } from '../../constants/regex.constants';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  showModal = false;
  showPassword = false;

  securityQuestions: string[] = [
    'What is your pet\'s name?',
    'What is your mother\'s maiden name?',
    'What was your first school?',
    'What is your favorite book?'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }
  passwordStrength: number = 0;
  ngOnInit(): void {
    this.registerForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.pattern(REGEX.name)]],
        email: ['', [Validators.required, Validators.pattern(REGEX.email)]],
        password: ['', [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(REGEX.password)
        ]],
        confirmPassword: ['', Validators.required],
        securityQuestion: ['', Validators.required],
        securityAnswer: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
    this.registerForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordStrength = this.calculatePasswordStrength(value);
    });
  }
  calculatePasswordStrength(password: string): number {
    let strength = 50;
    if (password.length >= 6) strength += 10;
    if (/[A-Z]/.test(password)) strength += 10;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    return Math.min(strength, 100);
  }

  getStrengthClass(strength: number): string {
    if (strength === 100) return 'bg-success'; // must come first
    if (strength > 80) return 'bg-info';
    if (strength > 60) return 'bg-warning';
    return 'bg-danger';
  }
  
  getStrengthLabel(strength: number): string {
    if (strength === 100) return 'Strong';
    if (strength > 80) return 'Good';
    if (strength > 60) return 'Fair';
    return 'Weak';
  }
  
  getStrengthTextClass(strength: number): string {
    if (strength === 100) return 'text-success';
    if (strength > 80) return 'text-info';
    if (strength > 60) return 'text-warning';
    return 'text-danger';
  }
  
  passwordMatchValidator: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  };

  get f() {
    return this.registerForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      alert('Please fill in all required fields.');
      return;
    }

    const formValues = this.registerForm.value;
    const salt = bcrypt.genSaltSync(10);
    formValues.password = bcrypt.hashSync(formValues.password, salt);
    formValues.confirmPassword = formValues.password;

    this.http.post('http://localhost:3000/users', formValues).subscribe({
      next: () => {
        this.registerForm.reset();
        this.showModal = true;
      },
      error: (err) => {
        console.error('Registration error:', err);
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  closeModal(): void {
    this.showModal = false;
    this.router.navigate(['/login']);
  }
}
