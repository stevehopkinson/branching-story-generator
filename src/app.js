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

const getNode = nodeId => story[nodeId];

const getChildId = (parentId, compass) => getNode(parentId)[compass];

const createNode = ({ text, parentId, compass }) => {
  let parentNode = getNode(parentId),
      newNodeIndex = story.length,
      newNode = { text };

  nodes.push(newNode);
  parentNode[compass] = newNodeIndex;
};

// Configure routes
app.get('/', (req, res) => res.render('index', story[0]));

// Export app
module.exports = app;
