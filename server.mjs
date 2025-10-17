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

app.post('/api/products', (req, res) => {
    const newProduct = req.body;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(data);
        const maxId = db.products.length > 0 ? Math.max(...db.products.map(p => p.id)) : 0;
        newProduct.id = maxId + 1;
        db.products.push(newProduct);
        const updatedDb = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedDb, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error(writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log("Товар успешно добавлен!");
            res.status(201).json(newProduct);
        });
    });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    fs.readFile(dbPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(fileContent);
        db.users = db.users.filter(user => user.id !== userId);
        const updatedFileContent = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedFileContent, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Ошибка записи в файл:", writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log(`Пользователь с ID ${userId} успешно удален!`);
            res.status(200).json({ success: true });
        });
    });
});

app.delete('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    fs.readFile(dbPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(fileContent);
        db.products = db.products.filter(product => product.id !== productId);
        const updatedFileContent = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedFileContent, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Ошибка записи в файл:", writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log(`Товар с ID ${productId} успешно удален!`);
            res.status(200).json({ message: 'Товар удален' });
        });
    });
});

app.put('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const updatedProductData = req.body;
    fs.readFile(dbPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(fileContent);
        const productIndex = db.products.findIndex(p => p.id === productId);
        if (productIndex !== -1) {
            db.products[productIndex] = { id: productId, ...updatedProductData };
        }
        const updatedFileContent = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedFileContent, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Ошибка записи в файл:", writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log(`Товар с ID ${productId} успешно обновлен!`);
            res.status(200).json(db.products[productIndex]);
        });
    });
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUserData = req.body;
    fs.readFile(dbPath, 'utf8', (err, fileContent) => {
        if (err) {
            console.error("Ошибка чтения файла:", err);
            return res.status(500).send('Ошибка сервера');
        }
        const db = JSON.parse(fileContent);
        const userIndex = db.users.findIndex(u => u.id === userId);
        if (userIndex !== -1) {
            db.users[userIndex].name = updatedUserData.name;
            db.users[userIndex].email = updatedUserData.email;
            db.users[userIndex].role = updatedUserData.role;
        }
        const updatedFileContent = JSON.stringify(db, null, 2);
        fs.writeFile(dbPath, updatedFileContent, 'utf8', (writeErr) => {
            if (writeErr) {
                console.error("Ошибка записи в файл:", writeErr);
                return res.status(500).send('Ошибка сервера');
            }
            console.log(`Пользователь с ID ${userId} успешно обновлен!`);
            res.status(200).json(db.users[userIndex]);
        });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});