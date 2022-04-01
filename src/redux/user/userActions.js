export const setCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_user',
      payload: user
    });
  }
};