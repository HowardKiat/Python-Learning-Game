const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/completetask/:id/:status', (req, res) => {
        const taskId = req.params.id;
        const taskStatus = req.params.status;
        const query = 'UPDATE todolist SET completed = ? WHERE id = ?';
        
        db.query(query, [taskStatus, taskId], (err, result) => {
            if (err) throw err;
            res.redirect('/todolist');
        });
    });

    return router;
};