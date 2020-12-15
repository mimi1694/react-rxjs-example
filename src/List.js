function List(props) {

  return (
    <ul>
      {props.people.map((person, i) =>
        (<li key={i}>{person.name}</li>)
      )}
    </ul>
  );
}

export default List;
