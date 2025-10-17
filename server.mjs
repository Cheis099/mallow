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

app.post('/api/users', (req, res) => {
    const newUser = req.body;
    fs.readFile(dbPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(fileContent);
        const maxId = db.users.length > 0 ? Math.max(...db.users.map(u => u.id)) : 0;
        newUser.id = maxId + 1;
        if (!newUser.role) {
            newUser.role = 'user';
        }
        db.users.push(newUser);
        const updatedFileContent = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedFileContent, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Ошибка записи в файл:", writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log("Пользователь успешно добавлен!");
            res.status(201).json(newUser);
        });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});