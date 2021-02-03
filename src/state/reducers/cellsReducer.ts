import { ActionTypes } from "../actionTypes";
import { Action } from "../actions";
import { Cell } from "../cell";

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionTypes.DELETE_CELL:
      return { ...state };

    case ActionTypes.INSERT_CELL_BEFORE:
      return { ...state };

    case ActionTypes.MOVE_CELL:
      return { ...state };

    case ActionTypes.UPDATE_CELL:
      const { id, content } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          [id]: {
            ...state.data[id],
            content,
          },
        },
      };

    default:
      return state;
  }
};

export default reducer;
