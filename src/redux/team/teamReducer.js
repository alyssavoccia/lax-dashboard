const teamReducer = (state = null, action) => {
  switch (action.type) {
    case 'set_current_team':
      return {
        team: action.payload
      };
    default:
        return state;
  }
};

export default teamReducer;