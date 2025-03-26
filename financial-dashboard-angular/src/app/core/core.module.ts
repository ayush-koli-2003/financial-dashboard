import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { RequestInterceptor } from './services/http-interceptor.service';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports:[HeaderComponent],
  providers:[AuthService,
    AuthGuard,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true
    }
  ]
})
export class CoreModule { }
