import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-central-login',
  templateUrl: './central-login.component.html',
  styleUrls: ['./central-login.component.scss']
})
export class CentralLoginComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  ngOnInit(): void {}
}
