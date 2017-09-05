import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { UserService } from '../services/users.service';
import { Router } from '@angular/router';

import { User }        from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: 'users.component.html'
})
export class UsersComponent {
  private users;
  public form;
  constructor(private userService: UserService, private router: Router, fb: FormBuilder) {
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): any {
     this.userService.getUsers().subscribe(res => this.users = res);
  }

}
