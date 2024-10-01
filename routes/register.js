const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Route to register a new user
    router.post('/register', (req, res) => {
        const { username, user_email, user_password } = req.body;
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

        db.query(query, [username, user_email, user_password], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('An error occurred while registering. Please try again.');
            }
            res.redirect('/login'); // Redirect to login page after registration
        });
    });

    return router;
};
