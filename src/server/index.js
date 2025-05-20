const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "noticias.json"));
});


