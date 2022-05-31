const path = require("path");
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, "../../dist")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../../dist/login/index.html"));
});

app.get("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../../dist/errors/404.html"));
});

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`);
}); 