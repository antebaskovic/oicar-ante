import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { RegistrationScreen } from '../register';

describe('RegistrationScreen', () => {
  test('renders correctly', () => {
    render(<RegistrationScreen />);
    // Add assertions to check if the component renders correctly
  });

  test('updates firstName state on first name input change', () => {
    const { getByPlaceholder } = render(<RegistrationScreen />);
    const firstNameInput = getByPlaceholder('First Name');

    fireEvent.changeText(firstNameInput, 'John');

    // Assert that the firstName state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates lastName state on last name input change', () => {
    const { getByPlaceholder } = render(<RegistrationScreen />);
    const lastNameInput = getByPlaceholder('Last Name');

    fireEvent.changeText(lastNameInput, 'Doe');

    // Assert that the lastName state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates email state on email input change', () => {
    const { getByPlaceholder } = render(<RegistrationScreen />);
    const emailInput = getByPlaceholder('Email');

    fireEvent.changeText(emailInput, 'test@example.com');

    // Assert that the email state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates password state on password input change', () => {
    const { getByPlaceholder } = render(<RegistrationScreen />);
    const passwordInput = getByPlaceholder('Password');

    fireEvent.changeText(passwordInput, 'password123');

    // Assert that the password state is updated correctly
    // Add assertions based on your implementation
  });

  test('performs registration on register button press', () => {
    // Mock the Api.register method
    const mockRegister = jest.fn((registrationData, callback) => {
      callback({ userId: '123' }); // Mock successful registration
    });

    // Mock the ToastAndroid.show method
    const mockShowToast = jest.fn();

    const { getByText, getByPlaceholder } = render(
      <RegistrationScreen
        api={{ register: mockRegister }}
        ToastAndroid={{ show: mockShowToast }}
      />
    );

    const firstNameInput = getByPlaceholder('First Name');
    fireEvent.changeText(firstNameInput, 'John');

    const lastNameInput = getByPlaceholder('Last Name');
    fireEvent.changeText(lastNameInput, 'Doe');

    const emailInput = getByPlaceholder('Email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const passwordInput = getByPlaceholder('Password');
    fireEvent.changeText(passwordInput, 'password123');

    const registerButton = getByText('Registration');
    fireEvent.press(registerButton);

    // Assert that the register method is called
    expect(mockRegister).toHaveBeenCalledTimes(1);
    // Assert that the ToastAndroid.show method is called with the appropriate parameters
    expect(mockShowToast).toHaveBeenCalledWith('Registration successful', 2000);
  });

  test('displays registration failed toast on unsuccessful registration', () => {
    // Mock the Api.register method
    const mockRegister = jest.fn((registrationData, callback) => {
      callback({}); // Mock unsuccessful registration
    });

    // Mock the ToastAndroid.show method
    const mockShowToast = jest.fn();

    const { getByText, getByPlaceholder } = render(
      <RegistrationScreen
        api={{ register: mockRegister }}
        ToastAndroid={{ show: mockShowToast }}
      />
    );

    const firstNameInput = getByPlaceholder('First Name');
    fireEvent.changeText(firstNameInput, 'John');

    const lastNameInput = getByPlaceholder('Last Name');
    fireEvent.changeText(lastNameInput, 'Doe');

    const emailInput = getByPlaceholder('Email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const passwordInput = getByPlaceholder('Password');
    fireEvent.changeText(passwordInput, 'password123');

    const registerButton = getByText('Registration');
    fireEvent.press(registerButton);

    // Assert that the register method is called
    expect(mockRegister).toHaveBeenCalledTimes(1);
    // Assert that the ToastAndroid.show method is called with the appropriate parameters
    expect(mockShowToast).toHaveBeenCalledWith('Registration failed', 2000);
  });
});
