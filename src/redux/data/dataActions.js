export const setCurrentData = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'set_data',
      payload: data
    });
  }
};