import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Tokens, TokenStorage, UserManager} from "@forgerock/javascript-sdk";
import {UserService} from "../user/user.service";
import * as forgerock from "@forgerock/javascript-sdk";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  private loginUrl: UrlTree = this.router.parseUrl('/central-login');

  /**
   * Extends CanActivate to protect selected routes from unauthenticated access
   *
   * @param next - Route that the user is trying to access
   * @param state - Router state
   * @returns Promise - Boolean or route to redirect the user to
   */
  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<true | UrlTree> {
    const tokens: Tokens | void = await TokenStorage.get();

    try {
      const info = await UserManager.getCurrentUser();

      if (tokens && info) {
        return true;
      }

    } catch (err) {
      console.log('error lvl 1', err);

      try {
        if (tokens && tokens.refreshToken) {
          try {
            const newTokens = await forgerock.TokenManager.getTokens({ forceRenew: true });
            console.log('newTokens', newTokens);
            return true;
          } catch (err) {
            console.error('Failed to renew access token', err);
            throw new Error('Failed to renew access token');
          }
        } else {
          throw new Error('No refresh token available');
        }

      } catch (err) {
        console.log('error lvl 2', err);
        this.resetAuthentication();
        return this.loginUrl;
      }
    }

    return this.loginUrl;
  }

  private resetAuthentication(): void {
    if (this.userService?.isAuthenticated && this.userService?.info) {
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('info');
    }
  }
}
