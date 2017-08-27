// @angular
import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { HttpModule }             from '@angular/http';
import { BrowserModule }          from '@angular/platform-browser';

// Services
import { UserService }            from './services/users.service';

// Components

// Modules

import { AppComponent }           from './app.component';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [
    UserService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
