const initState = {
  status: false,
  message: "test",
  severity: "success",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_SNACKBAR_TRUE":
      return {
        ...state,
        status: true,
      };
    case "SET_SNACKBAR_FALSE":
      return {
        ...state,
        status: false,
      };
    case "SET_SNACKBAR_MESSAGE":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_SNACKBAR_SEVERITY":
      return {
        ...state,
        severity: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
