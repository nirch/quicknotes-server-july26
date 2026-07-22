const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT ? process.env.PORT : 3000;
const notesRouter = require("./routes/notesRoutes.js");

// Middleware that parses JSON for every route
app.use(express.json());

app.use("/notes", notesRouter);


app.get("/", (req, res) => {
  res.send("Hello Express");
})


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


app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
