import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FaqComponent } from './components/faq/faq.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';

// Servicios
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { FaqsService } from './services/faqs.service';
import { PreguntasService } from './services/preguntas.service';

// Interceptores HTTP
import { httpInterceptorProviders } from './interceptors';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    FaqComponent,
    QuienesSomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    // Servicios
    ApiService,
    AuthService,
    LoadingService,
    FaqsService,
    PreguntasService,
    // Interceptores HTTP
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
