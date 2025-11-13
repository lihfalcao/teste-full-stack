import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthService } from './login/auth.service';
import { DebugInterceptor } from './interceptors/debug.interceptor.service';

@NgModule({
  declarations: [],
  imports: [BrowserModule, CommonModule, ReactiveFormsModule, HttpClientModule],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: DebugInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
