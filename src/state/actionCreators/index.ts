import { ActionTypes } from "../actionTypes";
import { Dispatch } from "redux";
import { Action, Direction } from "../actions";
import { Cell, CellTypes } from "../cell";
import axios from "axios";
import bundle from "../../bundler";
import { RootState } from "../reducers";

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

export const fetchCells = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.FETCH_CELLS });

    try {
      const { data }: { data: Cell[] } = await axios.get("/cells");

      dispatch({ type: ActionTypes.FETCH_CELLS_COMPLETE, payload: data });
    } catch (error) {
      dispatch({ type: ActionTypes.FETCH_CELLS_ERROR, payload: error.message });
    }
  };
};

export const saveCells = () => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order },
    } = getState();

    const cells = order.map(id => data[id]);

    try {
      await axios.post("/cells", { cells });
    } catch (error) {
      dispatch({
        type: ActionTypes.SAVE_CELLS_ERROR,
        payload: error.message,
      });
    }
  };
};
