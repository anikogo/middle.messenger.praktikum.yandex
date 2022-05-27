const path = require('path');
const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.static(path.resolve(__dirname, '../../dist')));

app.listen(PORT, function () {
  console.log(`app listening on port ${PORT}`);
}); 