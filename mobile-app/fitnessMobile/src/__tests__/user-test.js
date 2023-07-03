import React from 'react';
import { render } from '@testing-library/react-native';
import { UserScreen } from '../user';

describe('UserScreen', () => {
  test('renders correctly', () => {
    render(<UserScreen />);
    // Add assertions to check if the component renders correctly
  });

  test('updates firstName state on first name input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const firstNameInput = getByPlaceholder('First Name');

    fireEvent.changeText(firstNameInput, 'John');

    // Assert that the firstName state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates lastName state on last name input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const lastNameInput = getByPlaceholder('Last Name');

    fireEvent.changeText(lastNameInput, 'Doe');

    // Assert that the lastName state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates height state on height input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const heightInput = getByPlaceholder('Height');

    fireEvent.changeText(heightInput, '180');

    // Assert that the height state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates weight state on weight input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const weightInput = getByPlaceholder('Weight');

    fireEvent.changeText(weightInput, '75');

    // Assert that the weight state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates age state on age input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const ageInput = getByPlaceholder('Age');

    fireEvent.changeText(ageInput, '30');

    // Assert that the age state is updated correctly
    // Add assertions based on your implementation
  });

  test('updates gender state on gender input change', () => {
    const { getByPlaceholder } = render(<UserScreen />);
    const genderInput = getByPlaceholder('Gender');

    fireEvent.changeText(genderInput, 'Male');

    // Assert that the gender state is updated correctly
    // Add assertions based on your implementation
  });

  test('performs account update on edit button press', () => {
    // Mock the Api.updateAccount method
    const mockUpdateAccount = jest.fn((token, accountData, callback) => {
      callback({ UserID: '123' }); // Mock successful account update
    });

    const { getByText, getByPlaceholder } = render(
      <UserScreen
        api={{ updateAccount: mockUpdateAccount }}
        route={{ params: { token: 'testToken' } }}
      />
    );

    const firstNameInput = getByPlaceholder('First Name');
    fireEvent.changeText(firstNameInput, 'John');

    const lastNameInput = getByPlaceholder('Last Name');
    fireEvent.changeText(lastNameInput, 'Doe');

    const heightInput = getByPlaceholder('Height');
    fireEvent.changeText(heightInput, '180');

    const weightInput = getByPlaceholder('Weight');
    fireEvent.changeText(weightInput, '75');

    const ageInput = getByPlaceholder('Age');
    fireEvent.changeText(ageInput, '30');

    const genderInput = getByPlaceholder('Gender');
    fireEvent.changeText(genderInput, 'Male');

    const editButton = getByText('Edit');
    fireEvent.press(editButton);

    // Assert that the updateAccount method is called
    expect(mockUpdateAccount).toHaveBeenCalledTimes(1);
    // Assert that the updateAccount method is called with the correct parameters
    expect(mockUpdateAccount).toHaveBeenCalledWith('testToken', {
      firstName: 'John',
      lastName: 'Doe',
      height: 180,
      weight: 75,
      age: 30,
      gender: 'Male',
    });
  });
});
