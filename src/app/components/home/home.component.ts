import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  user: User;
  environment: string;

  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
    this.environment = environment.title;
  }
}
