export const setCurrentTeam = (team) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_team',
      payload: team
    });
  }
};

export const removeCurrentTeam = () => {
  return (dispatch) => {
    dispatch({
      type: 'remove_current_team',
      payload: null
    })
  }
};