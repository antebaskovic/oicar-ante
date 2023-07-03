const pool = require("../utils/db");
const jwtMiddleware = require("../middlewares/auth").jwtMiddleware;

module.exports = function (app) {
  app.post("/program", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }

    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO Programs (TrainerID, Name, Description, Category) VALUES (?, ?, ?, ?)",
          [
            req.user.userId,
            req.body.name,
            req.body.description,
            req.body.category,
          ]
        );

      res.status(201).json({ programId: result.insertId });
    } catch (err) {
      res.status(500).send();
    }
  });

  app.get("/program", jwtMiddleware, async (req, res) => {
    if (req.user.role === "Trainer") {
      try {
        const [programs] = await pool
          .promise()
          .query(
            "SELECT * FROM Programs JOIN Users ON Programs.TrainerID = Users.UserID WHERE Users.UserID = ?",
            [req.user.userId]
          );
        res.json(programs);
      } catch {
        res.status(500).send();
      }
    } else {
      try {
        const [programs] = await pool
          .promise()
          .query(
            "SELECT Programs.* FROM ProgramUsers JOIN Programs ON ProgramUsers.ProgramID = Programs.ProgramID WHERE UserID = ?",
            [req.user.userId]
          );
        res.json(programs);
      } catch {
        res.status(500).send();
      }
    }
  });

  app.get("/program/all", jwtMiddleware, async (req, res) => {
    if (req.user.role === "User") {
      try {
        const [programs] = await pool.promise().query("SELECT * FROM Programs");
        res.json(programs);
      } catch {
        res.status(500).send();
      }
    } else {
      res.status(500).send();
    }
  });

  app.get("/program/:programId/details", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const [programDetails] = await pool
        .promise()
        .query("SELECT * FROM Programs WHERE ProgramID = ?", [
          req.params.programId,
        ]);
      const [enrolledUsers] = await pool
        .promise()
        .query(
          "SELECT Users.UserID, Users.FirstName, Users.LastName, Users.Email, UserDetail.Height, UserDetail.Weight, UserDetail.Age, UserDetail.Gender, UserDetail.MiscellaneousLimits FROM ProgramUsers JOIN Users ON ProgramUsers.UserID = Users.UserID LEFT JOIN UserDetail ON Users.UserID = UserDetail.UserID WHERE ProgramID = ?",
          [req.params.programId]
        );

      res.json({ ...programDetails[0], enrolledUsers });
    } catch {
      res.status(500).send();
    }
  });

  app.post("/program/:programId/enroll", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "User") {
      return res.sendStatus(403);
    }
    try {
      await pool
        .promise()
        .query("INSERT INTO ProgramUsers (ProgramID, UserID) VALUES (?, ?)", [
          req.params.programId,
          req.user.userId,
        ]);
      res.status(201).send();
    } catch (err) {
      res.status(500).send();
    }
  });

  app.post("/program/:programId/training", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO Trainings (ProgramID, Type, DaysOfWeek, Name, Plan, Notes, Difficulty) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            req.params.programId,
            req.body.type,
            req.body.daysOfWeek,
            req.body.name,
            req.body.plan,
            req.body.notes,
            req.body.difficulty,
          ]
        );
      res.status(201).json({ trainingId: result.insertId });
    } catch {
      res.status(500).send();
    }
  });

  app.post("/program/:programId/meal", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO Meals (ProgramID, DaysOfWeek, Type, Name, Calories, Carbs, Protein, Fats, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
          [
            req.params.programId,
            req.body.daysOfWeek,
            req.body.type,
            req.body.name,
            req.body.calories,
            req.body.carbs,
            req.body.protein,
            req.body.fats,
            req.body.description,
          ]
        );
      res.status(201).json({ mealId: result.insertId });
    } catch {
      res.status(500).send();
    }
  });

  app.put("/program/:programId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const { name, description, category } = req.body;
      await pool
        .promise()
        .query(
          "UPDATE Programs SET Name = COALESCE(?, Name), Description = COALESCE(?, Description), Category = COALESCE(?, Category) WHERE ProgramID = ? AND TrainerID = ?",
          [name, description, category, req.params.programId, req.user.userId]
        );
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.delete("/program/:programId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      await pool
        .promise()
        .query("DELETE FROM Programs WHERE ProgramID = ? AND TrainerID = ?", [
          req.params.programId,
          req.user.userId,
        ]);
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.put("/meal/:mealId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const {
        daysOfWeek,
        type,
        name,
        calories,
        carbs,
        protein,
        fats,
        description,
      } = req.body;
      await pool
        .promise()
        .query(
          "UPDATE Meals SET DaysOfWeek = COALESCE(?, DaysOfWeek), Type = COALESCE(?, Type), Name = COALESCE(?, Name), Calories = COALESCE(?, Calories), Carbs = COALESCE(?, Carbs), Protein = COALESCE(?, Protein), Fats = COALESCE(?, Fats), Description = COALESCE(?, Description) WHERE MealID = ? AND ProgramID IN (SELECT ProgramID FROM Programs WHERE TrainerID = ?)",
          [
            daysOfWeek,
            type,
            name,
            calories,
            carbs,
            protein,
            fats,
            description,
            req.params.mealId,
            req.user.userId,
          ]
        );
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.delete("/meal/:mealId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      await pool
        .promise()
        .query(
          "DELETE FROM Meals WHERE MealID = ? AND ProgramID IN (SELECT ProgramID FROM Programs WHERE TrainerID = ?)",
          [req.params.mealId, req.user.userId]
        );
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.put("/training/:trainingId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const { type, daysOfWeek, name, plan, notes, difficulty } = req.body;
      await pool
        .promise()
        .query(
          "UPDATE Trainings SET Type = COALESCE(?, Type), DaysOfWeek = COALESCE(?, DaysOfWeek), Name = COALESCE(?, Name), Plan = COALESCE(?, Plan), Notes = COALESCE(?, Notes), Difficulty = COALESCE(?, Difficulty) WHERE TrainingID = ? AND ProgramID IN (SELECT ProgramID FROM Programs WHERE TrainerID = ?)",
          [
            type,
            daysOfWeek,
            name,
            plan,
            notes,
            difficulty,
            req.params.trainingId,
            req.user.userId,
          ]
        );
      console.log;
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.delete("/training/:trainingId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      await pool
        .promise()
        .query(
          "DELETE FROM Trainings WHERE TrainingID = ? AND ProgramID IN (SELECT ProgramID FROM Programs WHERE TrainerID = ?)",
          [req.params.trainingId, req.user.userId]
        );
      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.get("/meal/all", jwtMiddleware, async (req, res) => {
    if (req.user.role === "Trainer") {
      try {
        const [meals] = await pool.promise().query(
          "SELECT *, Meals.Name as mealName, Meals.Description AS mealDescription, Programs.Name AS programName FROM Meals JOIN Programs ON Meals.ProgramID = Programs.ProgramID WHERE Programs.TrainerID = ?",

          [req.user.userId]
        );
        res.json(meals);
      } catch {
        res.status(500).send();
      }
    } else {
      res.status(403).send();
    }
  });

  app.get("/meal/", jwtMiddleware, async (req, res) => {
    if (req.user.role === "Trainer") {
      try {
        const [meals] = await pool.promise().query(
          "SELECT *, Meals.Name as mealName, Meals.Description AS mealDescription, Programs.Name AS programName FROM Meals JOIN Programs ON Meals.ProgramID = Programs.ProgramID WHERE Programs.TrainerID = ?",

          [req.user.userId]
        );
        res.json(meals);
      } catch {
        res.status(500).send();
      }
    } else {
      res.status(403).send();
    }
  });

  app.get("/training/all", jwtMiddleware, async (req, res) => {
    if (req.user.role === "Trainer") {
      try {
        const [trainings] = await pool
          .promise()
          .query(
            " SELECT *, programs.name as programName, Trainings.name as trainingsName FROM Trainings JOIN Programs ON Trainings.ProgramID = programs.ProgramID WHERE programs.TrainerID = ?",
            [req.user.userId]
          );
        res.json(trainings);
      } catch {
        res.status(500).send();
      }
    } else {
      res.status(403).send();
    }
  });

  app.get("/meal/:mealId/details", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }

    try {
      const [meals] = await pool
        .promise()
        .query("SELECT * FROM Meals WHERE MealID = ?", [req.params.mealId]);

      res.json(meals);
    } catch {
      res.status(500).send();
    }
  });

  app.get("/training/:trainingId/details", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }

    try {
      const [training] = await pool
        .promise()
        .query("SELECT * FROM Trainings WHERE TrainingID = ?", [
          req.params.trainingId,
        ]);

      res.json(training);
    } catch {
      res.status(500).send();
    }
  });
  app.get("/week/:programId", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }

    try {
      const mealQuery = `
        SELECT 
            M.MealID,
            M.Name, 
            M.Type,
            M.DaysOfWeek
        FROM
            FitnessApp.Meals AS M
                JOIN
            FitnessApp.Programs AS P ON M.programID = P.programID
        WHERE
            P.programID = ?;
      `;

      const trainingQuery = `
        SELECT 
            T.TrainingID,
            T.Name,
            T.Type,
            T.DaysOfWeek

        FROM
            FitnessApp.Trainings AS T
                JOIN
            FitnessApp.Programs AS P ON T.programID = P.programID
        WHERE
            P.programID = ?;
      `;

      const [mealData] = await pool
        .promise()
        .query(mealQuery, [req.params.programId]);
      const [trainingData] = await pool
        .promise()
        .query(trainingQuery, [req.params.programId]);

      const week = {
        meals: mealData,
        trainings: trainingData,
      };

      res.json(week);
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  });
};
