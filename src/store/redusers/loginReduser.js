export const initialState = {
  res: [],
  loading: false,
};

export const loginReduser = (state = initialState, action) => {
  switch (action.type) {
    case "resSucces":
      return {
        ...state,
        res: [action.payload],
        loading: true,
      };
    case "resError":
      return {
        ...state,
        res: [action.payload],
        loading: false,
      };
    default:
      return state;
  }
};
export const dataOkResponse = (payload) => ({ type: "resSucces", payload });
export const dataErrorResponse = (payload) => ({ type: "resError", payload });
