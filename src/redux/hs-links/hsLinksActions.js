export const setCurrentLinks = (hsLinks) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_links',
      payload: hsLinks
    });
  }
};