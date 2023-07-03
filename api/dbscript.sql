CREATE DATABASE FitnessApp;

USE FitnessApp;

CREATE TABLE Users (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    Email VARCHAR(255) NOT NULL UNIQUE,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    PasswordHash VARCHAR(255) NOT NULL,
    Role ENUM('User', 'Trainer')
);

CREATE TABLE UserDetail (
    UserID INT PRIMARY KEY,
    Height FLOAT,
    Weight FLOAT,
    Age INT,
    Gender ENUM('Male', 'Female', 'Other'),
    MiscellaneousLimits TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Trainers (
    UserID INT PRIMARY KEY,
    Bio TEXT,
    LicensesAndCertificates TEXT,
    FocusArea TEXT,
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Programs (
    ProgramID INT PRIMARY KEY AUTO_INCREMENT,
    TrainerID INT NOT NULL,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Category VARCHAR(255),
    FOREIGN KEY (TrainerID) REFERENCES Users(UserID)
);

CREATE TABLE ProgramUsers (
    ProgramID INT NOT NULL,
    UserID INT NOT NULL,
    PRIMARY KEY (ProgramID, UserID),
    FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

CREATE TABLE Trainings (
    TrainingID INT PRIMARY KEY AUTO_INCREMENT,
    ProgramID INT NOT NULL,
    Type VARCHAR(255),
    DaysOfWeek VARCHAR(255),
    Name VARCHAR(255),
    Plan TEXT,
    Notes TEXT,
    Difficulty ENUM('Easy', 'Medium', 'Hard'),
    FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID)
);

CREATE TABLE Meals (
    MealID INT PRIMARY KEY AUTO_INCREMENT,
    ProgramID INT NOT NULL,
    DaysOfWeek VARCHAR(255),
    Type ENUM('Breakfast', 'Lunch', 'Dinner', 'Snack'),
    Name VARCHAR(255),
    Calories FLOAT,
    Carbs FLOAT,
    Protein FLOAT,
    Fats FLOAT,
    Description TEXT,
    FOREIGN KEY (ProgramID) REFERENCES Programs(ProgramID)
);

