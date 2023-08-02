const express = require('express');
const { connectToDb, getDb } = require('./db');

const PORT = 3000;

const app = express();

let db; // хранение бд

connectToDb((err) => {
    if (!err) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`listen port ${PORT}`);
        });
        db = getDb();
    } else {
        console.log(`db connection failed ${err}`);
    }
})

app.get('/users', (req, res) => {
    const userList = [];
    db
        .collection('userList')
        .find() // cursor не возвращает коллекцию является курсором
        .sort({ name: 1 }) // сортировка по алфавиту база как и везде в сортировке
        .forEach((user) => userList.push(user))
        .then(() => {
            res
                .status(200)
                .json(userList);
        })
        .catch(() => {
            res
                .status(500)
                .json({ error: "Что то пошло не так на сервере..." })
        })
})