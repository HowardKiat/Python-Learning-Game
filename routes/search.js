const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/search', (req, res) => {
        const searchTerm = req.query.query; // Matches the input field name in your form

        const query = 'SELECT * FROM todolist WHERE task LIKE ?';
        
        db.query(query, [`%${searchTerm}%`], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Internal Server Error');
            }

            res.render('search', { results });
        });
    });

    return router;
};
