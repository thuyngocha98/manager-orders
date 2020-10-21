// Initial State
const initialState = {
  user: null,
  isLoading: true,
};

// Redux: auth Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_ASYNC':
      return {
        ...state,
        isLoading: false,
      };
    case 'USER_ASYNC':
      return {
        ...state,
        user: action.user,
      };
    case 'UPDATE_USER_ASYNC':
      return {
        ...state,
        user: action.user,
      };
    case 'NO_USER_ASYNC':
      return {
        ...state,
        user: action.user,
      };
    case 'LOG_OUT_ASYNC':
      return {
        ...state,
        user: null,
      };
    default: {
      return state;
    }
  }
};

// Exports
export default authReducer;
