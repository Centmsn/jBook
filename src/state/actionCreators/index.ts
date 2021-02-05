import { ActionTypes } from "../actionTypes";
import { Dispatch } from "redux";
import { Action, Direction } from "../actions";
import { CellTypes } from "../cell";
import bundle from "../../bundler";

export const updateCell = (id: string, content: string) => {
  return {
    type: ActionTypes.UPDATE_CELL,
    payload: { id, content },
  };
};

export const deleteCell = (id: string) => {
  return {
    type: ActionTypes.DELETE_CELL,
    payload: id,
  };
};

export const moveCell = (id: string, direction: Direction) => {
  return {
    type: ActionTypes.MOVE_CELL,
    payload: {
      id,
      direction,
    },
  };
};

export const insertCellAfter = (id: string | null, type: CellTypes) => {
  return {
    type: ActionTypes.INSERT_CELL_AFTER,
    payload: {
      id,
      type,
    },
  };
};

export const createBundle = (cellId: string, input: string) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionTypes.BUNDLE_START,
      payload: {
        cellId,
      },
    });

    const result = await bundle(input);

    dispatch({
      type: ActionTypes.BUNDLE_COMPLETE,
      payload: {
        cellId,
        bundle: result,
      },
    });
  };
};
