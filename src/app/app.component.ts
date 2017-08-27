import { Component, OnInit } from '@angular/core';
import { UserService } from './services/users.service';

import { User }        from './models/user';

@Component({
  selector: 'app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  private users;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  public getUsers(): any {
     this.userService.getUsers().subscribe(res => this.users = res);
  }
}
