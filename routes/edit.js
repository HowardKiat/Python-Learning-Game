const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to display the edit form for a task
    router.get('/edit/:id', (req, res) => {  
        const query = 'SELECT * FROM todolist WHERE id = ?';

        db.query(query, [req.params.id], (err, results) => {
            if (err) throw err;
            if (results.length > 0) {
                res.render('edit', { todo: results[0] });
            } else {
                res.redirect('/todolist');
            }
        });
    });

    // Route to handle the submission of the edit form
    router.post('/edit/:id', (req, res) => {
        const { category, task, due_date } = req.body;
        const query = 'UPDATE todolist SET category = ?, task = ?, due_date = ? WHERE id = ?';

        db.query(query, [category, task, due_date, req.params.id], (err, results) => {
            if (err) throw err;
            res.redirect('/todolist');
        });
    });

    return router;
};
