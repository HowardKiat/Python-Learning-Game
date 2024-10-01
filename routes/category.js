const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to filter tasks by category
    router.post('/filter', (req, res) => {
        const { filter_category } = req.body;
        console.log('Filter category:', filter_category); // Debugging

        let sql = 'SELECT * FROM todolist';
        const params = [];
        
        if (filter_category) {
            sql += ' WHERE category = ?';
            params.push(filter_category);
        }

        console.log('SQL Query:', sql); // Debugging

        db.query(sql, params, (err, results) => {
            if (err) {
                console.error('Database query error:', err); // Debugging
                throw err;
            }
            console.log('Query Results:', results); // Debugging
            res.render('todolist', { todolist: results });
        });
    });

    // Route to search tasks
    router.get('/search', (req, res) => {
        const { query } = req.query;
        const sql = 'SELECT * FROM todolist WHERE task LIKE ?';
        db.query(sql, [`%${query}%`], (err, results) => {
            if (err) {
                console.error('Database query error:', err); // Debugging
                throw err;
            }
            res.render('todolist', { todolist: results });
        });
    });

    return router;
};
