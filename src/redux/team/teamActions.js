export const setCurrentTeam = (team) => {
  return (dispatch) => {
    dispatch({
      type: 'set_current_team',
      payload: team
    });
  }
};