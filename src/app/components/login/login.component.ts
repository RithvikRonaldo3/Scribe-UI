import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    // Add your login logic here
    console.log('Logging in...');
    // Example: Navigate to home page after successful login
    this.router.navigateByUrl('/home');
  }

  goBack() {
    
    this.router.navigate(['/']);
  }

  goToPasswordVerify(){
    this.router.navigate(['/forgot-password']);
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToRegister() {
    // Navigate to the registration page
    this.router.navigateByUrl('/register');
  }
}
