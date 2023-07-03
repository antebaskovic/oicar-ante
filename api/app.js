const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

require("./src/routes/auth")(app);
require("./src/routes/program")(app);
require("./src/routes/account")(app);
require("./src/routes/other")(app);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

module.exports = app;