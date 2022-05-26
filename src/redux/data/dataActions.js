export const setCurrentData = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'set_data',
      payload: data
    });
  }
};

export const removeCurrentData = () => {
  return (dispatch) => {
    dispatch({
      type: 'remove_current_data',
      payload: []
    })
  }
};