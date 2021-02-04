import { ActionTypes } from "../actionTypes";
import { CellTypes } from "../cell";

export type Direction = "up" | "down";

interface MoveCellAction {
  type: ActionTypes.MOVE_CELL;
  payload: {
    id: string;
    direction: Direction;
  };
}

interface DeleteCellAction {
  type: ActionTypes.DELETE_CELL;
  payload: string;
}

interface InsertCellAfterAction {
  type: ActionTypes.INSERT_CELL_AFTER;
  payload: {
    id: string | null;
    type: CellTypes;
  };
}

interface UpdateCellAction {
  type: ActionTypes.UPDATE_CELL;
  payload: {
    id: string;
    content: string;
  };
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction;
