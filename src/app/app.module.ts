import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './reusable/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { RecordNotesComponent } from './components/record-notes/record-notes.component';
import { HistoryComponent } from './components/history/history.component';
import { ScribeInfoComponent } from './components/scribe-info/scribe-info.component';
import { ProcessingComponent } from './components/processing/processing.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SpinnerComponent } from './reusable/spinner/spinner.component';
import { OnboardingComponent } from './components/onboarding/onboarding.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { PasswordVerificationComponent } from './components/password-verification/password-verification.component';
import { OtpVerificationComponent } from './components/otp-verification/otp-verification.component';
import { PasswordConfirmationComponent } from './components/password-confirmation/password-confirmation.component';
import { SplashScreenComponent } from './components/splash-screen/splash-screen.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';








const socketConfig: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {},
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RecordNotesComponent,
    HistoryComponent,
    ScribeInfoComponent,
    ProcessingComponent,
    SpinnerComponent,
    OnboardingComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    PasswordVerificationComponent,
    OtpVerificationComponent,
    PasswordConfirmationComponent,
    SplashScreenComponent, // Declare SiriWaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CommonModule,
    MatMenuModule,
    HttpClientModule,
    CommonModule,
    SocketIoModule.forRoot(socketConfig),
    MatIconModule,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
