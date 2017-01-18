const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

// Instantiate app and configure middleware
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));


// Configure routes
app.get('/', (req, res) => res.render('index'));

// Export app
module.exports = app;
