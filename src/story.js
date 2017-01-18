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

module.exports = { getSentence, getChildId, addSentence };
