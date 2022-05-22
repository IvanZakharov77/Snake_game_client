import { combineReducers } from "redux";
import { loginReduser } from "./loginReduser";
import { topGamerReduser } from "./topGamerReduser";

export const rootReduser = combineReducers({
  signup: loginReduser,
  topGamer: topGamerReduser,
});
