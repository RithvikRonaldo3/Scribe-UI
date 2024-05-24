import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent {
  title = 'Onboarding';

  constructor(private router: Router) { // Inject Router
    // Initialization logic
  }

  startOnboarding() {
    // Navigate to 'login' route when 'Login' button is clicked
    this.router.navigateByUrl('/login');
  }

  skipOnboarding() {
    console.log('Onboarding skipped');
    // Add your logic here for skipping the onboarding process
  }
}
