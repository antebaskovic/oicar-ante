import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { EnrollScreen } from '../enroll';


describe('EnrollScreen', () => {
    test('renders correctly', () => {
        render(<EnrollScreen route={{ params: { token: 'mock-token' } }} />);
        // Add assertions to check if the component renders correctly
    });

    test('fetches programs on componentDidMount', () => {
        // Mock the Api.getProgramEnroll method
        const mockGetProgramEnroll = jest.fn((token, callback) => {
            callback([
                { ProgramID: 1, Name: 'Program 1', Description: 'Description 1', Category: 'Category 1' },
                { ProgramID: 2, Name: 'Program 2', Description: 'Description 2', Category: 'Category 2' },
            ]);
        });

        const { getByText } = render(
            <EnrollScreen
                route={{ params: { token: 'mock-token' } }}
                api={{ getProgramEnroll: mockGetProgramEnroll }}
            />
        );

        // Assert that the programs are fetched and rendered correctly
        expect(mockGetProgramEnroll).toHaveBeenCalledTimes(1);
        expect(mockGetProgramEnroll).toHaveBeenCalledWith('mock-token', expect.any(Function));
        expect(getByText('Program 1')).toBeTruthy();
        expect(getByText('Program 2')).toBeTruthy();
    });

    test('displays program details modal when a program is selected', () => {
        // Mock the Api.getProgramEnroll method
        const mockGetProgramEnroll = jest.fn((token, callback) => {
            callback([
                { ProgramID: 1, Name: 'Program 1', Description: 'Description 1', Category: 'Category 1' },
            ]);
        });

        const { getByText, getByTestId, queryByText } = render(
            <EnrollScreen
                route={{ params: { token: 'mock-token' } }}
                api={{ getProgramEnroll: mockGetProgramEnroll }}
            />
        );

        fireEvent.press(getByText('Program 1'));

        // Assert that the program details modal is displayed
        expect(getByTestId('modal')).toBeTruthy();
        expect(getByText('Program 1')).toBeTruthy();
        expect(getByText('Description 1')).toBeTruthy();
        expect(getByText('Category 1')).toBeTruthy();

        // Close the program details modal
        fireEvent.press(getByText('Hide Modal Program'));

        // Assert that the program details modal is closed
        expect(queryByText('Program 1')).toBeNull();
    });

    test('refreshes programs on pull-to-refresh', () => {
        // Mock the Api.getPrograms method
        const mockGetPrograms = jest.fn((token, callback) => {
            callback([
                { ProgramID: 1, Name: 'Program 1', Description: 'Description 1', Category: 'Category 1' },
                { ProgramID: 2, Name: 'Program 2', Description: 'Description 2', Category: 'Category 2' },
            ]);
        });

        const { getByTestId, getByText } = render(
            <EnrollScreen
                route={{ params: { token: 'mock-token' } }}
                api={{ getPrograms: mockGetPrograms }}
            />
        );

        fireEvent(getByTestId('flatlist'), 'refresh')
    })
});