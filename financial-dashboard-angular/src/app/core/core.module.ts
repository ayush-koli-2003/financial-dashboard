import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RequestInterceptor } from './services/http-interceptor.service';
import { ButtonModule } from 'primeng/button';
import { Menu } from 'primeng/menu';
import { Ripple } from 'primeng/ripple';
import { Menubar } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    Menu,
    Ripple,
    Menubar,
    InputTextModule,
    DialogModule,
    SharedModule
  ],
  exports:[],
  providers:[AuthService,
    AuthGuard,
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide:HTTP_INTERCEPTORS, useClass:RequestInterceptor, multi:true
    }
  ]
})
export class CoreModule { }
