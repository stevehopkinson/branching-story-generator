const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

// Instantiate app and configure middleware
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('public'));

// Configure routes
app.get('/', (req, res) => res.render('index'));

// Export app
module.exports = app;