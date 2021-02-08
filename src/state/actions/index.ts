import { ActionTypes } from "../actionTypes";
import { Cell, CellTypes } from "../cell";

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

interface BundleStartAction {
  type: ActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

interface BundleCompleteAction {
  type: ActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      error: string;
    };
  };
}

interface FetchCellsAcition {
  type: ActionTypes.FETCH_CELLS;
}

interface FetchCellsCompleteAcition {
  type: ActionTypes.FETCH_CELLS_COMPLETE;
  payload: Cell[];
}

interface FetchCellsErrorAcition {
  type: ActionTypes.FETCH_CELLS_ERROR;
  payload: string;
}

interface SaveCellsErrorAction {
  type: ActionTypes.SAVE_CELLS_ERROR;
  payload: string;
}

export type Action =
  | MoveCellAction
  | DeleteCellAction
  | InsertCellAfterAction
  | UpdateCellAction
  | BundleStartAction
  | BundleCompleteAction
  | FetchCellsAcition
  | FetchCellsCompleteAcition
  | FetchCellsErrorAcition
  | SaveCellsErrorAction;
