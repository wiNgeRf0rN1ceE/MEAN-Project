import { Routes }               from '@angular/router';
import { AuthGuard }            from './guards/auth.guard';
import { LoginComponent }       from './components/login.component';
import { UsersComponent }       from './components/users.component';
import { AppComponent }         from './app.component';


export const AppRoutes: Routes = [
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];