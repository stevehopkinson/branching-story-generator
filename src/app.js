const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

// Import story module and buildContext helper function
const story = require('./story');
const buildContext = require('./buildContext');

// Instantiate app and configure middleware
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('public'));

// Configure routes
app.get('/:id', (req, res) => {
  let context = buildContext(story, req.params.id);
  res.render('index', context);
});

app.get('/', (req, res) => res.redirect('/0'));

app.post('/', (req, res) => {
  story.addSentence(req.body);
  res.redirect(`/${req.body.parentId}`);
});

// Export app
module.exports = app;
