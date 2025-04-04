import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { DisplayProfileComponent } from './components/display-profile/display-profile.component';
import { CardModule } from 'primeng/card';
import { AvatarModule } from 'primeng/avatar';
import { provideHttpClient } from '@angular/common/http';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { SharedModule } from '../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { ButtonModule } from 'primeng/button';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    DisplayProfileComponent,
    UpdateProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    CardModule,
    AvatarModule,
    SharedModule,
    ReactiveFormsModule,
    Dialog,
    TabsModule,
    ButtonModule
  ],
  providers:[provideHttpClient()]
})
export class UserProfileModule { }
