// const initial_state = {
//   data: null
// };

const dataReducer = (state = null, action) => {
  switch (action.type) {
    case 'set_data':
      return {
        data: action.payload
      };
    case 'remove_current_data':
      return {
        data: action.payload
      }
    default:
        return state;
  }
};

export default dataReducer;