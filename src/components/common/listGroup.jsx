//whenevery you create a component you need to think about the props that you are going to pass to it
//whenever you create a component you need to think about the inerface of that component
// and the best way to use that component before actually implment it

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  onItemSelect,
  selectedItem,
}) => {
  // use object destructuring to get the items and textProperty and valueProperty from the props object
  // use object destructuring to get the list of items from the props object

  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          onClick={() => onItemSelect(item)}
          className={
            item === selectedItem ? 'list-group-item active' : 'list-group-item'
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
    textProperty: "name",
    valueProperty: "_id"
}

export default ListGroup;