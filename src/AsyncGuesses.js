import { useEffect, useState } from "react";
import { BehaviorSubject, combineLatest } from "rxjs";
import { map } from "rxjs/operators";
import { peopleStream } from "./people";

const shirtChoice = new BehaviorSubject("all");

function AsyncGuesses() {
  const [people, setPeople] = useState([]);

  // As more people come in from the back end, simultaneously filter w/ user's input
  useEffect(() => {
    const subscription =
    combineLatest([peopleStream, shirtChoice])
      .pipe(map(([people, shirt]) => people.filter(person => shirt === 'all' || person.shirt === shirt)))
      .subscribe(setPeople);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div>
      <form>
        <label>
          Shirt color:
          <select id="shirtForm" onChange={event => shirtChoice.next(event.target.value)}>
            <option value="all">--</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="pink">Pink</option>
            <option value="gray">Gray</option>
            <option value="black">Black</option>
          </select>
        </label>
      </form>

      <ul>
        {people.map((person, i) =>
          (<li key={i}>{person.name}</li>)
        )}
      </ul>
    </div>
  );
}

export default AsyncGuesses;
