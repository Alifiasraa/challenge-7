require("./src/config/instrument");
const express = require("express");
const Sentry = require("@sentry/node");
const cors = require("cors");
const indexRoutes = require("./src/routes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api/v1", indexRoutes);

// const port = process.env.PORT_SERVER;
// app.listen(port, () => {
//   console.log("Server is running on port: " + port);
// });

Sentry.setupExpressErrorHandler(app);

module.exports = app;
