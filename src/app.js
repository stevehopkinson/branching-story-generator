const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const story = require('./story');

// Instantiate app and configure middleware
const app = express();
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(serveStatic('public'));

// Create helper functions to build context objects for handlebars
const buildContext = (sentenceId) => {
  let sentence = story.getSentence(sentenceId);
  let context = { text: sentence.text };
  ['n', 'e', 's', 'w'].forEach(
    (compass) => context[compass] = buildChildContext(sentenceId, compass)
  );
  return context;
};

const buildChildContext = (parentId, compass) => {
  let child = { parentId, compass };
  if (story.getSentence(parentId).hasOwnProperty(compass)) {
    child.id = story.getChildId(parentId, compass);
    child.text = story.getSentence(child.id).text;
  }
  return child;
};

// Configure routes
app.get('/:id', (req, res) => {
  let context = buildContext(req.params.id);
  res.render('index', context);
});

app.get('/', (req, res) => res.redirect('/0'));

app.post('/', (req, res) => {
  story.addSentence(req.body);
  res.redirect(`/${req.body.parentId}`);
});

// Export app
module.exports = app;
