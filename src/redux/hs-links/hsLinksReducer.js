const hsLinksReducer = (state = null, action) => {
  switch (action.type) {
    case 'set_current_links':
      return {
        hsLinks: action.payload
      };
    case 'update_current_links':
      return {
        ...state,
        hsLinks: action.payload
      };
    default:
        return state;
  }
};

export default hsLinksReducer;