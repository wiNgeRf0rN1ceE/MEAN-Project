import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from './services/users.service';
import { Router } from '@angular/router';

import { User }        from './models/user';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private user: User = null;
  constructor(private userService: UserService, private router: Router) {
    this.user = this.userService.user;
    this.userService.user_emitter.subscribe((user) => this.user = user);
  }
}
