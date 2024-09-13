const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.post('/add', (req, res) => {
        const { task, due_date } = req.body;
        const query = 'INSERT INTO todolist (task, completed, due_date) VALUES (?, 0, ?)';

        db.query(query, [task, due_date], (err, results) => {
            if (err) throw err;
            res.redirect('/todolist');
        });
    });
    
    return router;
};

