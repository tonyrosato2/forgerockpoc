import {Component, OnInit} from '@angular/core';
import {UserService} from "../../authentication/services/user/user.service";
import * as forgerock from "@forgerock/javascript-sdk";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService) {
  }

  async ngOnInit(): Promise<void> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (code && state) {
      this.processAuthorizationCode(code, state)
        .then(() => {
          // console.log('process Authorization Code');
          // Continue with the desired logic after processing the authorization code
        })
        .catch((error) => {
          console.error(error);
          // Handle the error
        });
    }
  }

  public async login(): Promise<void> {
    try {
      await forgerock.TokenManager.getTokens({login: 'redirect'});
      this.userService.info = await forgerock.UserManager.getCurrentUser();
      this.userService.isAuthenticated = true;
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to propagate it
    }
  }

  private async processAuthorizationCode(code: string, state: string): Promise<void> {
    try {
      await this.login();
    } catch (error) {
      console.error(error);
      throw error; // Re-throw the error to propagate it
    }
  }

  async logout(): Promise<void> {
    try {
      await forgerock.FRUser.logout();

      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('info');
      window.location.href = `${document.location.origin}/central-login/`;
    } catch (error) {
      console.error(error);
    }
  }
}
