const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const temperatureConversion = require('./routes/temperature');
// require('dotenv').config();
const session = require('express-session');

//Imports the todo list routes from the todolist module in the routes directory. It passes the database connection (db) and the checkLoggedIn function as arguments to the imported module.
const todolistRoutes = require('./routes/todolist')(db, checkLoggedIn);
const app = express();

// Session config
app.use(session({
    secret: 'todoapp',
    resave: true,
    saveUninitialized: true
}));

// This function checks if a user is logged in by checking the loggedin property of the session object. 
function checkLoggedIn(req, res, next) {
    if (req.session.loggedin) {
        next();
    } else {
        req.session.error = 'Please Login!';
        res.redirect('/login');
    }
}

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set 'views' directory for any views being rendered with res.render()
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine as Pug
app.set('view engine', 'pug');

// Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapp',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database');

        // Route handlers
        app.get('/', (req, res) => {
            res.render('index', { title: 'Home' });
        });

        app.get('/apple_info', (req, res) => {
            res.render('apple_info', { title: 'Apple Info Exercise' });
        });

        app.get('/temperature', (req, res) => {
            res.render('temperature', { title: 'Temperature Conversion' });
        });

        app.get('/responsivepage', (req, res) => {
            res.render('responsivepage', { title: 'Responsive Page' });
        });

        //LOGIN/REGISTRATION
        const regiterRoutes= require('./routes/register')(db);
        app.use('/', regiterRoutes);

        const loginRoutes= require('./routes/login')(db);
        app.use('/', loginRoutes);

        // TODO-LIST
        const todolistRoutes = require('./routes/todolist')(db);
        app.use('/', todolistRoutes);

        const addRoutes = require('./routes/add')(db);
        app.use('/', addRoutes);

        const editRoutes = require('./routes/edit')(db);
        app.use('/', editRoutes);

        const deleteRoutes = require('./routes/delete')(db);
        app.use('/', deleteRoutes);

        const searchRoutes = require('./routes/search')(db);
        app.use('/', searchRoutes);  // Use search routes

        const categoryRoutes = require('./routes/category')(db);
        app.use('/category', categoryRoutes);

        const completetaskRoute = require('./routes/completetask')(db);
        app.use(completetaskRoute);

        // Handle the form submission
        app.use('/', temperatureConversion);

        // Port Listener
        app.listen(3000, function () {
            console.log('Example app listening on port 3000!');
        });
    }
});

