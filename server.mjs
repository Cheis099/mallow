import express from "express";
import path from 'node:path';
import fs from "node:fs";
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = 3000;

app.use(express.json());

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(__dirname));
const dbPath = path.join(__dirname, 'server', 'database.json');

app.get('/api/data', (req, res) => {
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка на сервере');
      return;
    }
    res.json(JSON.parse(data));
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});