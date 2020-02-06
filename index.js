const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        style: 'home.css'
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page',
        style: 'login.css'
    });
});

app.get('/schedule', (req, res) => {
    res.render('schedule', {
        title: 'Schedule Page',
        style: 'schedule.css',
        contacts: [
            {name: 'James', email: 'Jamesmdavis95@gmail.com', age: '24'},
            {name: 'John', email: 'John@gmail.com', age: '21'}
        ]
    });
});

app.post('/api/credentials', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});