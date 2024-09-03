const express = require('express');
const router = express.Router();

module.exports = (db) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().slice(0, 10); // Get tomorrow's date in YYYY-MM-DD format

    router.get('/todolist', (req, res) => {
        db.query('SELECT * FROM todolist ORDER BY completed ASC, due_date ASC', (err, results) => {
            if (err) throw err;
            results.forEach(todo => {
                let date = new Date(todo.due_date);
                let options = { weekday: 'short', year: 'numeric', month:'short', day: 'numeric' };
                todo.due_date = date.toLocaleDateString('en-US', options);
            });
            res.render('todolist', { todolist: results, minDate });
        });
    });

    return router;
};