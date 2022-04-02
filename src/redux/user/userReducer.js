const initial_state = {
  user: null
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case 'set_current_user':
      return {
        user: action.payload
      };
    case 'remove_current_user':
      return state = action.payload;
    default:
        return state;
  }
};

export default userReducer;