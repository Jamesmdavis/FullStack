const express = require('express');
const exphbs = require('express-handlebars');
const sassMiddleware = require('node-sass-middleware');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

const adminUser = {
    username: 'admin',
    password: 'password'
}

let adminToken = '';

//An Eney Called Average

//Middleware
app.use(sassMiddleware({
    src: path.join(__dirname + '/sass'),
    dest: path.join(__dirname + '/public'),
    debug: true,
    outputStyle: 'expanded'
}));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Home Page',
        style: 'home.css'
    });
});


app.get('/schedule', verifyToken, (req, res) => {
    jwt.verify(myToken, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({authData});
        }
    });
    
    res.render('schedule', {
        title: 'Schedule Page',
        style: 'schedule.css',
        contacts: [
            {name: 'James', email: 'Jamesmdavis95@gmail.com', age: '24'},
            {name: 'John', email: 'John@gmail.com', age: '21'}
        ]
    });
});

app.get('/login', (req, res) => {
    res.render('login', {
        title: 'Login Page',
        style: 'login.css',
        script: 'login.js'
    });
});

app.post('/login', (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password
    }

    if(user.username != adminUser.username || user.password != adminUser.password) {
        console.log('Hello');
        res.redirect('/login');
    } else {
        jwt.sign({user}, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            if(err) {
                res.sendStatus(403);
            } else {
                console.log('hit');
                res.send(token);
            }
        });
    }
});

app.get('/api/credentials', (req, res) => {

});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}