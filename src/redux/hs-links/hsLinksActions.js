export const setCurrentLinks = (hsLinks) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_links',
      payload: hsLinks
    });
  }
};

export const updateCurrentLinks = (hsLinks, playerId, test) => {
  const updatedHsLinks = hsLinks;
  for (const person of updatedHsLinks) {
    if (person.id === playerId) {
      person[test] = null;
    }
    if (person.wbLink === null && person.threeLink === null && person.broadLink === null && person.agilityLink === null) {
      updatedHsLinks.filter(user => user.id === playerId);
    }
  }

  return (dispatch) => {
    dispatch({
      type: 'update_current_links',
      payload: updatedHsLinks
    });
  }
}