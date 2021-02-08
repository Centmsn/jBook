import "./celllist.css";

import { useEffect } from "react";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Fragment } from "react";
import CellListItem from "./CellListItem";
import AddCell from "./AddCell";

const CellList: React.FC = () => {
  const { fetchCells, saveCells } = useActions();

  useEffect(() => {
    fetchCells();
  }, []);

  // useEffect(() => {
  //   saveCells()
  // }, []);

  const cells = useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id];
    });
  });

  const renderedCells = cells.map(cell => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} key={cell.id} />
      <AddCell prevCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className="cell-list">
      <AddCell prevCellId={null} forceVisible={cells.length === 0} />
      {renderedCells}
    </div>
  );
};

export default CellList;
