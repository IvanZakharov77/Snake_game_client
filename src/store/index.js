import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { loginReduser } from "./redusers/loginReduser";
import { topGamerReduser } from "./redusers/topGamerReduser";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReduser = combineReducers({ loginReduser, topGamerReduser });
export const store = createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(thunk))
);
