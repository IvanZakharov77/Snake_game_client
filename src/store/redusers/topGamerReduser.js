export const initialState = {
  resTopGamer: [],
};

export const topGamerReduser = (state = initialState, action) => {
  switch (action.type) {
    case "resTopGamer":
      return {
        ...state,
        resTopGamer: [action.payload],
      };

    default:
      return state;
  }
};
export const dataResTopGamer = (payload) => ({ type: "resTopGamer", payload });
