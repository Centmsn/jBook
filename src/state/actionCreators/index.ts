import { ActionTypes } from "../actionTypes";
import { Action, Direction } from "../actions";
import { CellTypes } from "../cell";

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
