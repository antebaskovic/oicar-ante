import { Api } from '../api';

// Mock the global fetch function
global.fetch = jest.fn();

describe('Api', () => {
  let api;

  beforeEach(() => {
    api = new Api();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('register', () => {
    it('should make a POST request to /register with the user data', () => {
      const user = { email: 'test@example.com', password: 'password' };
      const callback = jest.fn();

      api.register(user, callback);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://192.168.1.118:3000/register',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
      );
    });
  });

  describe('login', () => {
    it('should make a POST request to /login with the user data', () => {
      const user = { email: 'test@example.com', password: 'password' };
      const callback = jest.fn();

      api.login(user, callback);

      expect(global.fetch).toHaveBeenCalledWith(
        'http://192.168.1.118:3000/login',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
      );
    });
  });

  // Add more test cases for other methods...

});