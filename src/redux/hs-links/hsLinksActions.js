export const setCurrentLinks = (hsLinks) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_links',
      payload: hsLinks
    });
  }
};

export const updateCurrentLinks = (hsLinks, playerId, test) => {
  for (const person of hsLinks) {
    if (person.id === playerId) {
      person[test] = null;
    }
    if (!person.wbLink && !person.threeLink && !person.agilityLink && !person.broadLink) {
      hsLinks = hsLinks.filter(user => user.id !== playerId);
    }
  }

  return (dispatch) => {
    dispatch({
      type: 'update_current_links',
      payload: hsLinks
    });
  }
}