const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'set_current_user':
      return {
        ...state,
        user: action.payload
      };
      default:
        return state;
  }
};

export default userReducer;