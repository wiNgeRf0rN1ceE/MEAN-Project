// @angular
import { NgModule }                   from '@angular/core';
import { RouterModule }               from '@angular/router';
import { FormsModule }                from '@angular/forms';
import { ReactiveFormsModule }        from "@angular/forms";
import { HttpModule }                 from '@angular/http';
import { BrowserModule }              from '@angular/platform-browser';
import { BrowserAnimationsModule }    from '@angular/platform-browser/animations';

// Services
import { UserService }                from './services/users.service';

// Components
import { AppComponent }               from './app.component';
import { LoginComponent }             from './components/login.component';
import { UsersComponent }             from './components/users.component';

// Modules
import { MdCoreModule, MdInputModule, 
         MdButtonModule
       }                              from '@angular/material';
// Routes
import { AppRoutes }                  from './app.routes';

// Guards
import { AuthGuard }                  from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, UsersComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, BrowserAnimationsModule,
    MdCoreModule, MdInputModule, MdButtonModule,
    ReactiveFormsModule, RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    AuthGuard,
    UserService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
