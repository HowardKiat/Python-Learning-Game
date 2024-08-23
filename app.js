const express = require('express');
const app = express();
const path = require('path');

// Set 'views' directory for any views 
// being rendered res.render()
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
// Set view engine as Pug
app.set('view engine', 'pug');

// app.get('/', function (req, res) {
//     res.render('index', { title: 'Hey', message: 'Hello there!' });
// });

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.get('/apple_info', (req, res) => {
    res.render('apple_info');
});