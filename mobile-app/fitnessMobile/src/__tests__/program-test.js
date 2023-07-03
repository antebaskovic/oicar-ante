import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProgramScreen } from '../program';

describe('ProgramScreen', () => {
  test('renders correctly', () => {
    render(<ProgramScreen />);
    // Add assertions to check if the component renders correctly
  });

  test('displays program details modal on program item press', () => {
    const program = { id: 1, name: 'Program 1', description: 'Program 1 Description' };

    const { getByText, getByTestId } = render(<ProgramScreen />);
    const programItem = getByText(program.name);

    fireEvent.press(programItem);

    // Assert that the program details modal is displayed
    expect(getByTestId('program-modal')).toBeTruthy();
    // Add assertions to check if the program details are displayed correctly
  });

  test('enrolls in the program on enroll button press', () => {
    const program = { id: 1, name: 'Program 1', description: 'Program 1 Description' };

    // Mock the Api.postProgramEnroll method
    const mockPostProgramEnroll = jest.fn((token, id, callback) => {
      callback(true); // Mock successful enrollment
    });

    const { getByText, getByTestId } = render(
      <ProgramScreen
        route={{ params: { token: 'token' } }}
        api={{ postProgramEnroll: mockPostProgramEnroll }}
      />
    );

    const programItem = getByText(program.name);
    fireEvent.press(programItem);

    const enrollButton = getByText('Enroll');
    fireEvent.press(enrollButton);

    // Assert that the postProgramEnroll method is called
    expect(mockPostProgramEnroll).toHaveBeenCalledTimes(1);
    // Add assertions to check if the appropriate toast message is shown
  });

  test('hides program details modal on hide button press', () => {
    const program = { id: 1, name: 'Program 1', description: 'Program 1 Description' };

    const { getByText, getByTestId, queryByTestId } = render(<ProgramScreen />);
    const programItem = getByText(program.name);

    fireEvent.press(programItem);

    // Assert that the program details modal is displayed
    expect(getByTestId('program-modal')).toBeTruthy();

    const hideButton = getByText('Hide');

    fireEvent.press(hideButton);

    // Assert that the program details modal is hidden
    expect(queryByTestId('program-modal')).toBeNull();
  });

  test('refreshes program list on pull to refresh', () => {
    // Mock the Api.getPrograms method
    const mockGetPrograms = jest.fn((token, callback) => {
      callback([{ id: 1, name: 'Program 1' }, { id: 2, name: 'Program 2' }]);
    });

    const { getByType } = render(<ProgramScreen api={{ getPrograms: mockGetPrograms }} />);

    const flatList = getByType('FlatList');

    fireEvent(flatList, 'refresh');

    // Assert that the getPrograms method is called
    expect(mockGetPrograms).toHaveBeenCalledTimes(1);
    // Add assertions to check if the program list is refreshed correctly
  });
});