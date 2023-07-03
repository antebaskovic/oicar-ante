const pool = require("../utils/db");
const jwtMiddleware = require("../middlewares/auth").jwtMiddleware;

module.exports = function (app) {
  app.get("/myusers", jwtMiddleware, async (req, res) => {
    if (req.user.role !== "Trainer") {
      return res.sendStatus(403);
    }
    try {
      const [users] = await pool
        .promise()
        .query(
          " SELECT DISTINCT Users.*, Programs.* FROM ProgramUsers JOIN Programs ON ProgramUsers.ProgramID = Programs.ProgramID  JOIN Users ON ProgramUsers.UserID = Users.UserID left JOIN UserDetail ON Users.UserID = UserDetail.UserID WHERE Programs.TrainerID  = ?",
          [req.user.userId]
        );
      res.json(users);
    } catch {
      res.status(500).send();
    }
  });
};
