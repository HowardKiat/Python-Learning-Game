const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // GET route for rendering the login page
    router.get('/login', (req, res) => {
        const error = req.session.error;
        req.session.error = null; // Clear the error message
        res.render('login', {
            error
        });
    });

    // POST route for handling login form submissions
    router.post('/login', (req, res) => {
        const { user_email, user_password } = req.body;

        if (user_email && user_password) {
            const query = 'SELECT * FROM users WHERE user_email = ? AND user_password = ?';
            db.query(query, [user_email, user_password], (error, results) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('An error occurred while logging in.');
                }

                if (results.length > 0) {
                    // Set session variables
                    req.session.loggedin = true;
                    req.session.user_email = user_email;
                    req.session.user_id = results[0].id; // Assign id from the DB to session
                    req.session.user_name = results[0].user_name; // Assign user_name from the DB to session

                    // Redirect to the todolist after successful login
                    return res.redirect('/todolist');
                } else {
                    // Invalid login
                    res.render('login', {
                        error: 'Incorrect Email and/or Password!'
                    });
                }
            });
        } else {
            // Missing email or password
            res.render('login', {
                error: 'Please enter Email and Password!'
            });
        }
    });

    // GET route for logging out
    router.get('/logout', (req, res) => {
        if (req.session) {
            // Delete session object
            req.session.destroy(err => {
                if (err) {
                    console.error(err);
                    return res.status(500).send('Could not log out.');
                } else {
                    return res.redirect('/login'); // Redirect to login after logout
                }
            });
        } else {
            res.redirect('/login'); // Redirect to login if no session exists
        }
    });

    return router;
};
