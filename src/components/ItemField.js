const ItemField = (props) => {
  return (
    <div>
      <label>
        Name:<input id={`name#${props.id}`} type="text" onChange={props.update} required></input>
      </label>
      <label>
        Date:<input id={`date#${props.id}`} type="date" onChange={props.update} required></input>
      </label>
      <button type="button" onClick={props.remove} id={props.id}>
        -
      </button>
    </div>
  );
};

export default ItemField;
