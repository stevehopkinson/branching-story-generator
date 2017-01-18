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

// Create story object and helper functions
const story = [{ text: "There once was a big, bad wolf." }];

const getSentence = id => story[id];

const getChildId = (parentId, compass) => getSentence(parentId)[compass];

const setChildId = (parentId, compass, childId) => getSentence(parentId)[compass] = childId;

const addSentence = ({ text, parentId, compass }) => {
  let parentSentence = getSentence(parentId),
      newSentenceId = story.length,
      newSentence = { text };

  story.push(newSentence);
  setChildId(parentId, compass, newSentenceId);
};

// Create helper functions to build context objects for handlebars
const buildContext = (sentenceId) => {
  let sentence = getSentence(sentenceId);
  let context = { text: sentence.text };
  ['n', 'e', 's', 'w'].forEach(
    (compass) => context[compass] = buildChildContext(sentenceId, compass)
  );
  return context;
};

const buildChildContext = (parentId, compass) => {
  let child = { parentId, compass };
  if (getSentence(parentId).hasOwnProperty(compass)) {
    child.id = getChildId(parentId, compass);
    child.text = getSentence(child.id).text;
  }
  return child;
};

// Configure routes
app.get('/', (req, res) => res.render('index', buildContext(0)));

app.post('/', (req, res) => {
  addSentence(req.body);
  res.redirect(`/${req.body.parentId}`);
});

// Export app
module.exports = app;
