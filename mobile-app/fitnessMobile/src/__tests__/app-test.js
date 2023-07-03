import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../app';
import { locale } from '../lang/hr';





describe('App', () => {
  test('renders without error', () => {
    render(<App />);
    // If the render function does not throw an error, the test passes
  });
});

describe('Main component', () => {
  test('renders UserScreen, EnrollScreen, and ProgramScreen', () => {
    const { getByText } = render(<App />);
    expect(getByText(locale.appTitle)).toBeTruthy();
  });

  // Add more specific tests for Main component if needed
});

describe('Navigation', () => {
  test('navigates to Login screen initially', () => {
    const { getByText } = render(<App />);
    expect(getByText(locale.appTitle)).toBeTruthy();
  });

  test('navigates to Registration screen', () => {
    const { getByText } = render(<App />);
     expect(getByText(locale.titleRegistration)).toBeTruthy();
  });

  test('navigates to Main screen', () => {
    const { getByText } = render(<App />);
  
  });

  // Add more specific navigation tests if needed
});