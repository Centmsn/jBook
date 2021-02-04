import { useTypedSelector } from "../hooks/useTypedSelector";

export interface CellListProps {}

const CellList: React.FC<CellListProps> = () => {
  useTypedSelector(({ cells: { order, data } }) => {
    return order.map(id => {
      return data[id];
    });
  });

  return <div>cell list</div>;
};

export default CellList;
