export const setCurrentLinks = (hsLinks) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_links',
      payload: hsLinks
    });
  }
};

export const removeCurrentLinks = () => {
  return (dispatch) => {
    dispatch({
      type: 'remove_current_links',
      payload: []
    })
  }
};