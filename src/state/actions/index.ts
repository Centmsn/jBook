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

interface InsertCellBeforeAction {
  type: ActionTypes.INSERT_CELL_BEFORE;
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
  | InsertCellBeforeAction
  | UpdateCellAction;
