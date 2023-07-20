import {Component, OnInit} from '@angular/core';
import * as forgerock from "@forgerock/javascript-sdk";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.initializeForgeRockSDK();
  }

  private initializeForgeRockSDK(): void {
    forgerock.Config.set({
      serverConfig: {
        baseUrl: environment.AM_URL,
        timeout: 30000,
      },
      realmPath: environment.REALM_PATH,
      clientId: environment.WEB_OAUTH_CLIENT,
      redirectUri: environment.APP_URL+'/central-login/',
      scope: 'openid profile me.read',
    });
  }
}
