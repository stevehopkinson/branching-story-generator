const buildContext = (story, sentenceId) => {
  const buildParentContext = (sentenceId) => {
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

  return buildParentContext(sentenceId);
}

module.exports = buildContext;
