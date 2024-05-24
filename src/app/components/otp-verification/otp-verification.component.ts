import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {

  constructor(private router: Router) { }


  ngOnInit(): void {
  }

  goBack(): void {
    this.router.navigate(['/forgot-password']); // Replace with actual route
  }

  goToPasswordVerification(){
    this.router.navigate(['/password-verification']); // Replace with actual route
  }


  

  move(e:any, p:any, c:any, n:any){
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != "") {
          n.focus();
      }
    }
    if (e.key === "Backspace") {
      if (p != "") {
          p.focus(); 
      }
  }
  
}
}
