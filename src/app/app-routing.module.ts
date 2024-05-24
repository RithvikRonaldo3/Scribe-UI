import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecordNotesComponent } from './components/record-notes/record-notes.component';
import { HistoryComponent } from './components/history/history.component';
import { ScribeInfoComponent } from './components/scribe-info/scribe-info.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordVerificationComponent } from './components/password-verification/password-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';

const routes: Routes = [
  {
    path: '', // Default path (root)
    component: OnboardingComponent, // Display OnboardingComponent for the root path
  },
  {
    path: 'login', // Path for home component
    component: LoginComponent, // Display HomeComponent for '/home' path
  },
  {
    path: 'home', // Path for home component
    component: HomeComponent, // Display HomeComponent for '/home' path
  },
  {
    path: 'register', // Path for record notes component
    component: RegisterComponent, // Display RecordNotesComponent for '/record' path
  },
  {
    path: 'forgot-password', // Path for history component
    component: ForgotPasswordComponent // Display HistoryComponent for '/history' path
  },
  {
    path: 'otp-verification', // Path for scribe info component
    component: OtpVerificationComponent, // Display ScribeInfoComponent for '/scribe-info' path
  },
  {
    path: 'password-verification', // Path for scribe info component
    component: PasswordVerificationComponent, // Display ScribeInfoComponent for '/scribe-info' path
  },
  {
    path: 'splash-screen', // Path for scribe info component
    component: SplashScreenComponent, // Display ScribeInfoComponent for '/scribe-info' path
  },
  {
    path: 'record',
    component: RecordNotesComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  {
    path: 'scribe-info',
    component: ScribeInfoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
