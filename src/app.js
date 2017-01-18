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

// Configure routes
app.get('/', (req, res) => res.render('index', story[0]));

// Export app
module.exports = app;
