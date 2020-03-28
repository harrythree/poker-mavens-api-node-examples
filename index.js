require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const systemStats = require('./controllers/system-stats');
const chipLeaders = require('./controllers/chip-leaders');
const newAccount = require('./controllers/new-account');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'hbs');

app.get('/', (req, res) => res.render('index'));
app.get('/system-stats', systemStats);
app.get('/chip-leaders', chipLeaders);
app.get('/new-account', newAccount.get);
app.post('/new-account', newAccount.post);

app.listen(port, () => console.log(`running on ${port}`));
