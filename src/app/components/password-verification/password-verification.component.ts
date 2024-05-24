import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-password-verification',
  templateUrl: './password-verification.component.html',
  styleUrls: ['./password-verification.component.scss']
})
export class PasswordVerificationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin(){
    this.router.navigate(['/splash-screen']); // Replace with actual route
  }

  goBack(): void {
    this.router.navigate(['/forgot-password']); // Replace with actual route
  }


}
