import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * State representing whether the user is authenticated or not
   */
  get isAuthenticated(): boolean {
    return JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false');
  }

  set isAuthenticated(value: boolean) {
    sessionStorage.setItem('isAuthenticated', JSON.stringify(value));
  }

  /**
   * State repreesnting previously retrieved user information
   */
  get info(): any {
    return JSON.parse(sessionStorage.getItem('info') || '{}');
  }

  set info(value: any) {
    sessionStorage.setItem('info', JSON.stringify(value));
  }
}
