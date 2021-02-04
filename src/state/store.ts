import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
// import { ActionTypes } from "../state/actionTypes";

export const store = createStore(reducers, {}, applyMiddleware(thunk));
