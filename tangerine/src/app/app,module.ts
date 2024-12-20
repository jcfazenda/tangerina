import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module'; 

import { ProfileComponent } from './pages/social-media/profile/profile.component';  
import { CommonModule } from '@angular/common';
import { ProfileModule } from './pages/social-media/profile/profile.module'; 
import { LoginComponent } from './pages/authenticator/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    PhotosComponent,
    DashboardComponent,
    ProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    
    AppRoutingModule,
    ProfileModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
