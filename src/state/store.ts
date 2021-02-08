import { applyMiddleware, createStore } from "redux";
import { persistMiddleware } from "./middleware/persist-middleware";
import thunk from "redux-thunk";
import reducers from "./reducers";

export const store = createStore(
  reducers,
  {},
  applyMiddleware(persistMiddleware, thunk)
);
