const express = require("express");
const app = express();
const PORT = 8080;

// Middleware that parses JSON for every route
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Express");
})

app.listen(PORT, () => {
  console.log("Server is listening on port " + PORT);
});
