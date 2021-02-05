import { produce } from "immer";
import { ActionTypes } from "../actionTypes";
import { Action } from "../actions";

interface BundlesState {
  [key: string]:
    | {
        loading: boolean;
        code: string;
        error: string;
      }
    | undefined;
}

const initialState: BundlesState = {};

const reducer = produce(
  (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
      case ActionTypes.BUNDLE_START:
        state[action.payload.cellId] = {
          loading: true,
          code: "",
          error: "",
        };
        return state;

      case ActionTypes.BUNDLE_COMPLETE:
        state[action.payload.cellId] = {
          loading: false,
          code: action.payload.bundle.code,
          error: action.payload.bundle.error,
        };
        return state;

      default:
        return state;
    }
  }
);

export default reducer;
