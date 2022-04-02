export const setCurrentUser = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_user',
      payload: user
    });
  }
};

export const removeCurrentUser = () => {
  return (dispatch) => {
    dispatch({
      type: 'remove_current_user',
      payload: null
    })
  }
}