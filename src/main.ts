import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { AppRoutingModule } from './app/app-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, AppRoutingModule, MatToolbarModule),
        provideAnimationsAsync(),
        provideHttpClient()
    ]
})
  .catch(err => console.error(err));
