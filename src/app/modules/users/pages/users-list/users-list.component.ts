import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent implements OnInit {
  showSpinner = true;
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((data: any) => {
      const newRes = data.concat(data);
      this.users = newRes;
      this.showSpinner = false;
    });
  }

  deleteUser(id: number) {
    const user = this.users.find((x) => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.userService
      .delete(id)
      .pipe(first())
      .subscribe(() => this.getUsers());
  }

  trackByFn(_index: number, item: any): number {
    return item.id;
  }
}
