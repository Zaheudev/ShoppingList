const AddMemberField = (props) => {
    return (
      <div>
        <label>
          Email:<input id={props.id} type="text" onChange={props.update} required></input>
        </label>
        <button type="button" onClick={props.remove} id={props.id}>
          -
        </button>
      </div>
    );
  };
  
  export default AddMemberField;