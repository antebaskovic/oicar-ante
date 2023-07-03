import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../login';

describe('LoginScreen', () => {
  test('renders correctly', () => {
    render(<LoginScreen />);
    // Add assertions to check if the component renders correctly
  });

  test('updates email state on text input change', () => {
    const { getByPlaceholder } = render(<LoginScreen />);
    const emailInput = getByPlaceholder('Enter your email');

    fireEvent.changeText(emailInput, 'test@example.com');

    // Assert that the email state is updated correctly
    expect(emailInput.props.value).toBe('test@example.com');
  });

  test('updates password state on text input change', () => {
    const { getByPlaceholder } = render(<LoginScreen />);
    const passwordInput = getByPlaceholder('Enter your password');

    fireEvent.changeText(passwordInput, 'password123');

    // Assert that the password state is updated correctly
    expect(passwordInput.props.value).toBe('password123');
  });

  test('navigates to Main screen on successful login', () => {
    // Mock the Api.login method
    const mockLogin = jest.fn((credentials, callback) => {
      callback({ accessToken: 'mock-access-token' });
    });

    const mockNavigation = { navigate: jest.fn() };

    const { getByText, getByPlaceholder } = render(
      <LoginScreen api={{ login: mockLogin }} navigation={mockNavigation} />
    );

    const emailInput = getByPlaceholder('Enter your email');
    const passwordInput = getByPlaceholder('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(getByText('Login'));

    // Assert that the login method is called with the correct credentials
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' }, expect.any(Function));

    // Assert that the navigation to the Main screen is triggered with the access token
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Main', { token: 'mock-access-token' });
  });

  test('displays login failed toast on unsuccessful login', () => {
    // Mock the Api.login method
    const mockLogin = jest.fn((credentials, callback) => {
      callback({});
    });

    const mockShowToast = jest.fn();

    const { getByText, getByPlaceholder } = render(
      <LoginScreen api={{ login: mockLogin }} showToast={mockShowToast} />
    );

    const emailInput = getByPlaceholder('Enter your email');
    const passwordInput = getByPlaceholder('Enter your password');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.press(getByText('Login'));

    // Assert that the login method is called with the correct credentials
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password123' }, expect.any(Function));

    // Assert that the login failed toast is displayed
    expect(mockShowToast).toHaveBeenCalledTimes(1);
    expect(mockShowToast).toHaveBeenCalledWith('Login failed', 'short');
  });

  test('navigates to Registration screen on Registration button press', () => {
    const mockNavigation = { navigate: jest.fn() };

    const { getByText } = render(<LoginScreen navigation={mockNavigation} />);

    fireEvent.press(getByText('Register'));

    // Assert that the navigation to the Registration screen is triggered
    expect(mockNavigation.navigate).toHaveBeenCalledTimes(1);
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Registration');
  });
});