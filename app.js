const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const temperatureConversion = require('./routes/temperature');

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

// Handle the form submission
app.use('/', temperatureConversion);

// Port Listener
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
