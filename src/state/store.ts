import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { ActionTypes } from "../state/actionTypes";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "code",
  },
});

store.dispatch({
  type: ActionTypes.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: "text",
  },
});
