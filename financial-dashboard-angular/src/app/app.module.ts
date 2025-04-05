import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ProgressBarModule } from 'primeng/progressbar';
import Aura from '@primeng/themes/aura';
import Material from '@primeng/themes/material';
import {StyleClassModule} from 'primeng/styleclass';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ProgressBarModule,
    StyleClassModule,
    SharedModule
  ],
  providers: [provideCharts(withDefaultRegisterables()),provideAnimationsAsync(),providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } })],
  bootstrap: [AppComponent]
})
export class AppModule { }
