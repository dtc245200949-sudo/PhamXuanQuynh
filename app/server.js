const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>He thong Dat ve Xem phim (De 11) đang hoat dong!</h1>');
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});