const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../utils/db");
const secretKey = require("../middlewares/auth").secretKey;
const jwtMiddleware = require("../middlewares/auth").jwtMiddleware;

module.exports = function (app) {
  app.get("/test", async (req, res) => {
    try {
      await pool.promise().query("SELECT 1");
      res.send("Connected");
    } catch {
      res.status(500).send("Database connection error");
    }
  });

  app.post("/register", async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const [result] = await pool
        .promise()
        .query(
          "INSERT INTO Users (Email, FirstName, LastName, PasswordHash, Role) VALUES (?, ?, ?, ?, ?)",
          [
            req.body.email,
            req.body.firstName,
            req.body.lastName,
            hashedPassword,
            req.body.role,
          ]
        );

      if (req.body.role === "Trainer") {
        const [trainerInsertQuery] = await pool
          .promise()
          .query(
            "INSERT INTO Trainers (UserID, Bio, LicensesAndCertificates, FocusArea) VALUES (?, ?, ?, ?)",
            [result.insertId, "", "", ""]
          );
      }
      res.status(201).json({ userId: result.insertId });
    } catch {
      res.status(500).send();
    }
  });

  app.post("/login", async (req, res) => {
    try {
      const [users] = await pool
        .promise()
        .query("SELECT * FROM Users WHERE Email = ?", [req.body.email]);

      if (users.length > 0) {
        if (await bcrypt.compare(req.body.password, users[0].PasswordHash)) {
          const accessToken = jwt.sign(
            {
              userId: users[0].UserID,
              email: users[0].Email,
              role: users[0].Role,
            },
            secretKey
          );

          res.json({ accessToken });
        } else {
          res.status(401).send();
        }
      } else {
        res.status(404).send();
      }
    } catch {
      res.status(500).send();
    }
  });

  app.put("/changePassword", jwtMiddleware, async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const [user] = await pool
        .promise()
        .query("SELECT * FROM Users WHERE UserID = ?", req.user.userId);

      if (user.length > 0) {
        const passwordMatch = await bcrypt.compare(
          oldPassword,
          user[0].PasswordHash
        );

        if (passwordMatch) {
          const hashedNewPassword = await bcrypt.hash(newPassword, 10);
          await pool
            .promise()
            .query("UPDATE Users SET PasswordHash = ? WHERE UserID = ?", [
              hashedNewPassword,
              req.user.userId,
            ]);

          res.status(200).send("Password changed successfully");
        } else {
          res.status(401).send("Incorrect old password");
        }
      } else {
        res.status(404).send("User not found");
      }
    } catch {
      res.status(500).send("Error occurred while changing password");
    }
  });
};
