const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const notesRouter = require("./routes/notesRoutes.js");
const authRouter = require("./routes/authRoutes.js");
const cors = require("cors");
const { logger } = require("./middlewares/logger.js");
const { sequelize } = require("./db/models/index.js");

// Middleware that parses JSON for every route
app.use(cors());
app.use(express.json());
app.use(logger);

app.use("/notes", notesRouter);
app.use("/auth", authRouter);

app.get("/", async (req, res) => {
  const [results, metadata] = await sequelize.query("SELECT * FROM test_connection");
  console.log(results);
  res.send("Hello Express");
});

app.get("/demo", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Query:", req.query);
  console.log("Params:", req.params);
  console.log("Body:", req.body); // Needs body parser
  res.send("Check console for request data");
});

// app.get("*", (req, res) => {
//   res.status(404).send("Page not found");
// });

// Error Handling middleware - always in the END
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to database:", error);
  }
}

app.listen(PORT, async () => {
  console.log("Server is listening on port " + PORT);
  await dbConnect();
});
