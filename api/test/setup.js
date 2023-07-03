const mysql = require('mysql2/promise');
let connection;

before(async function() {
  connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "FitnessApp",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
    multipleStatements: true
});

  await connection.query("SET @user_hashed_password = '$2a$10$peX4iZWCFY1bW5DPOGN9OOmgszyATVP.spjIx7ptgM3PU/VV9r7KS'; SET @trainer_hashed_password = '$2a$10$peX4iZWCFY1bW5DPOGN9OOmgszyATVP.spjIx7ptgM3PU/VV9r7KS'; INSERT INTO Users (UserId, Email, FirstName, LastName, PasswordHash, Role) VALUES (1, 'user@test.com', 'Test', 'User', @user_hashed_password, 'User'); SET @user_id = (SELECT UserID FROM Users WHERE Email = 'user@test.com'); INSERT INTO UserDetail (UserID, Height, Weight, Age, Gender) VALUES (@user_id, 180, 80, 25, 'Male'); INSERT INTO Users (UserId, Email, FirstName, LastName, PasswordHash, Role) VALUES (2, 'trainer@test.com', 'Test', 'Trainer', @trainer_hashed_password, 'Trainer'); SET @trainer_id = (SELECT UserID FROM Users WHERE Email = 'trainer@test.com'); INSERT INTO Trainers (UserID, Bio) VALUES (@trainer_id, \"I am a test trainer.\"); INSERT INTO Programs (ProgramID, TrainerID, Name, Description, Category) VALUES (1, @trainer_id, 'Program 1', \"This is a description for Program 1\", 'Cardio'); SET @program_id = (1); INSERT INTO ProgramUsers (ProgramID, UserID) VALUES (@program_id, @user_id); INSERT INTO Trainings (ProgramID, Type, DaysOfWeek, Name, Plan, Notes, Difficulty) VALUES (@program_id, 'Cardio', 'Monday, Wednesday, Friday', \"Cardio Plan 1\", \"Run for 30 minutes\", \"Bring water\", 'Medium'); INSERT INTO Meals (ProgramID, DaysOfWeek, Type, Name, Calories, Carbs, Protein, Fats, Description) VALUES (@program_id, 'Monday, Tuesday', 'Breakfast', 'Healthy Breakfast', 300, 30, 20, 10, \"Eggs, toast, and avocado\");");
});

after(async function() {
  await connection.query("DELETE FROM Meals; DELETE FROM Trainings; DELETE FROM ProgramUsers; DELETE FROM Programs; DELETE FROM Trainers; DELETE FROM UserDetail; DELETE FROM Users;");

  await connection.end();
});
