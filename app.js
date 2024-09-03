const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const temperatureConversion = require('./routes/temperature');
const mysql = require('mysql2');

const app = express();

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set 'views' directory for any views being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine as Pug
app.set('view engine', 'pug');

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

//TODO-LIST
const todolistRoutes = require('./routes/todolist')(db);
app.use('/', todolistRoutes);

const addRoutes = require('./routes/add')(db);
app.use('/', addRoutes);

const completetaskRoute = require('./routes/completetask')(db);
app.use(completetaskRoute);

// Handle the form submission
app.use('/', temperatureConversion);

// Data Base Connection
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
    }
});
    

// Port Listener
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
