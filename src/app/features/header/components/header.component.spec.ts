import { HeaderComponent } from './header.component';
import { UserService } from '../../authentication/services/user/user.service';
import * as forgerock from '@forgerock/javascript-sdk';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let userService: UserService;

  // Mock objects and functions
  let mockTokenManagerGetTokens: jest.Mock;
  let mockUserManagerGetCurrentUser: jest.Mock;
  let mockFRUserLogout: jest.Mock;

  beforeEach(() => {
    // Mock UserService
    userService = { info: null, isAuthenticated: false } as UserService;

    // Mock Forgerock functions
    mockTokenManagerGetTokens = jest.fn();
    mockUserManagerGetCurrentUser = jest.fn();
    mockFRUserLogout = jest.fn();

    forgerock.TokenManager.getTokens = mockTokenManagerGetTokens;
    forgerock.UserManager.getCurrentUser = mockUserManagerGetCurrentUser;
    forgerock.FRUser.logout = mockFRUserLogout;

    // Initialize HeaderComponent
    component = new HeaderComponent(userService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('login', () => {
    it('should call forgerock functions and set userService values', async () => {
      const testUser = { name: 'testUser' };

      mockTokenManagerGetTokens.mockResolvedValue({});
      mockUserManagerGetCurrentUser.mockResolvedValue(testUser);

      await component.login();

      expect(mockTokenManagerGetTokens).toHaveBeenCalledWith({ login: 'redirect' });
      expect(mockUserManagerGetCurrentUser).toHaveBeenCalled();
      expect(userService.info).toEqual(testUser);
      expect(userService.isAuthenticated).toBe(true);
    });
  });

  describe('logout', () => {
    it('should call forgerock logout and reset userService values', async () => {
      Object.defineProperty(window, 'location', {
        writable: true,
        value: { href: '' }
      });

      await component.logout();
      expect(mockFRUserLogout).toHaveBeenCalled();
      expect(window.location.href).toEqual(`${document.location.origin}/central-login/`);
    });
  });
});

