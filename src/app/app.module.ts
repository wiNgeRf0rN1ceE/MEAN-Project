import { NgModule }               from '@angular/core';
import { RouterModule }           from '@angular/router';
import { BrowserModule }          from '@angular/platform-browser';

import { AppComponent }           from './app.component';

@NgModule({
  declarations: [
    AppComponent 
  ],
  imports: [
    BrowserModule
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
