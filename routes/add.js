const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to add a new task
    router.post('/add', (req, res) => {
        const { category, task, due_date } = req.body;
        const query = 'INSERT INTO todolist (category, task, completed, due_date) VALUES (?, ?, 0, ?)';

        db.query(query, [category, task, due_date], (err, results) => {
            if (err) throw err;
            res.redirect('/todolist');
        });
    });

    return router;
};