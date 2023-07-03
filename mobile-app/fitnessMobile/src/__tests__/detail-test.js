import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { DetailScreen } from '../detail';

describe('DetailScreen', () => {
  test('renders correctly', () => {
    render(<DetailScreen route={{ params: { token: 'mock-token' } }} />);
    // Add assertions to check if the component renders correctly
  });

  test('fetches programs on componentDidMount', () => {
    // Mock the Api.getPrograms method
    const mockGetPrograms = jest.fn((token, callback) => {
      callback([
        { ProgramID: 1, Name: 'Program 1' },
        { ProgramID: 2, Name: 'Program 2' },
      ]);
    });
    // Mock the Api.getProgramEnroll method
    const mockGetProgramEnroll = jest.fn();

    const { getByText } = render(
      <DetailScreen
        route={{ params: { token: 'mock-token' } }}
        api={{ getPrograms: mockGetPrograms, getProgramEnroll: mockGetProgramEnroll }}
      />
    );

    // Assert that the programs are fetched and rendered correctly
    expect(mockGetPrograms).toHaveBeenCalledTimes(1);
    expect(mockGetPrograms).toHaveBeenCalledWith('mock-token', expect.any(Function));
    expect(getByText('Program 1')).toBeTruthy();
    expect(getByText('Program 2')).toBeTruthy();
  });

  test('calls getProgramEnroll when a program is selected', () => {
    const mockGetProgramEnroll = jest.fn();

    const { getByText } = render(
      <DetailScreen
        route={{ params: { token: 'mock-token' } }}
        api={{ getProgramEnroll: mockGetProgramEnroll }}
      />
    );

    fireEvent.press(getByText('Program 1'));

    // Assert that getProgramEnroll is called with the correct parameters
    expect(mockGetProgramEnroll).toHaveBeenCalledTimes(1);
    expect(mockGetProgramEnroll).toHaveBeenCalledWith('mock-token', 1, expect.any(Function));
  });
});