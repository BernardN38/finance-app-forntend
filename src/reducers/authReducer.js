const initState = {
  status: false,
  token:{}
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_AUTH_TRUE":
      return {
        ...state,
        status: true,
      };
    case "SET_AUTH_FALSE":
      return {
        ...state,
        status: false,
      };
      case "SET_USER_TOKEN":
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;

