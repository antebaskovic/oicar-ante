const pool = require("../utils/db");
const jwtMiddleware = require("../middlewares/auth").jwtMiddleware;

module.exports = function (app) {
  app.get("/account", jwtMiddleware, async (req, res) => {
    try {
      const [users] = await pool
        .promise()
        .query("SELECT * FROM Users WHERE UserID = ?", [req.user.userId]);
      if (users.length === 0) {
        return res.sendStatus(404);
      }

      if (req.user.role === "Trainer") {
        const [trainers] = await pool
          .promise()
          .query("SELECT * FROM Trainers WHERE UserID = ?", [req.user.userId]);
        return res.json({ ...users[0], trainerDetails: trainers[0] });
      } else {
        const [userDetails] = await pool
          .promise()
          .query("SELECT * FROM UserDetail WHERE UserID = ?", [
            req.user.userId,
          ]);
        return res.json({ ...users[0], userDetails: userDetails[0] });
      }
    } catch {
      res.status(500).send();
    }
  });

  app.put("/account", jwtMiddleware, async (req, res) => {
    const {
      firstName,
      lastName,
      height,
      weight,
      age,
      gender,
      miscellaneousLimits,
      bio,
      licensesAndCertificates,
      focusArea,
    } = req.body;
    try {
      if (firstName || lastName) {
        await pool
          .promise()
          .query(
            "UPDATE Users SET FirstName = COALESCE(?, FirstName), LastName = COALESCE(?, LastName) WHERE UserID = ?",
            [firstName, lastName, req.user.userId]
          );
      }

      if (
        req.user.role === "Trainer" &&
        (bio || licensesAndCertificates || focusArea)
      ) {
        await pool
          .promise()
          .query(
            "UPDATE Trainers SET Bio = COALESCE(?, Bio), LicensesAndCertificates = COALESCE(?, LicensesAndCertificates), FocusArea = COALESCE(?, FocusArea) WHERE UserID = ?",
            [bio, licensesAndCertificates, focusArea, req.user.userId]
          );
      }

      if (
        req.user.role === "User" &&
        (height || weight || age || gender || miscellaneousLimits)
      ) {
        await pool
          .promise()
          .query(
            "UPDATE UserDetail SET Height = COALESCE(?, Height), Weight = COALESCE(?, Weight), Age = COALESCE(?, Age), Gender = COALESCE(?, Gender), MiscellaneousLimits = COALESCE(?, MiscellaneousLimits) WHERE UserID = ?",
            [height, weight, age, gender, miscellaneousLimits, req.user.userId]
          );
      }

      res.sendStatus(204);
    } catch {
      res.status(500).send();
    }
  });

  app.get("/clientDetails/:userId", jwtMiddleware, async (req, res) => {
    const userId = req.params.userId;

    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const [userDetails] = await pool
        .promise()
        .query(
          "SELECT Users.*, UserDetail.* FROM Users left JOIN UserDetail ON Users.UserID = UserDetail.UserID WHERE Users.UserID  = ?",
          [userId]
        );

      if (userDetails.length === 0) {
        return res.sendStatus(404).send();
      }
      return res.json(userDetails[0]);
    } catch {
      res.status(500).send();
    }
  });
};
