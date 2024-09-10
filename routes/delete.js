const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/delete/:id', (req, res) => {
        const taskId = req.params.id;
        const query = 'DELETE FROM todolist WHERE id = ?';
        
        db.query(query, [taskId], (err, results) => {
            if (err) throw err;
            res.redirect('/todolist');
        });
    });

    return router;
};


