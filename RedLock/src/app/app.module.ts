import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CreateNewRoomComponent } from './create-new-room/create-new-room.component';

import { JoinRoomComponent } from './join-room/join-room.component';
import { HomeNavBarComponent } from './home-nav-bar/home-nav-bar.component';
import { CommunicationRoomComponent } from './communication-room/communication-room.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    CreateNewRoomComponent,
    JoinRoomComponent,
    HomeNavBarComponent,
    CommunicationRoomComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
