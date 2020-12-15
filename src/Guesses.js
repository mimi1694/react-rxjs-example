import { React, useEffect, useState } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, take } from 'rxjs/operators';
import List from './List';
import { getPeople } from './people';

// In a larger application, these Observables might be handles in a store or centralized place

// Behavior Subjects representing all the user's choices
const shirtChoice = new BehaviorSubject("all");
const eyeChoice = new BehaviorSubject("all");
const hairChoice = new BehaviorSubject("all");
const hatChoice = new BehaviorSubject("all");

// The stream of people that have been fetched so far from the backend
const fetchedPeopleStream = new BehaviorSubject([]);

function Guesses () {
  // set up the local state
  const [filteredPeople, setFilteredPeople] = useState([]);

  // useEffect is a great place to subscribe, and then unsubscribe (to prevent memory leaks) to observables
  // in lieu of componentDidMount or componentWillUnmount
  useEffect(() => {
    const subscription =
       // operator
      combineLatest([
        // observables
        fetchedPeopleStream,
        shirtChoice,
        eyeChoice,
        hairChoice,
        hatChoice
      ])
        // operators
      .pipe(map(([people, shirt, eye, hair, hat]) =>
        people.filter(person => (shirt === 'all' || person.shirt === shirt) &&
                                (eye === 'all' || person.eye === eye) &&
                                (hair === 'all' || person.hair === hair) &&
                                (hat === 'all' || person.hat.toString() === hat))))
      .subscribe( // subscribes
        setFilteredPeople // observer
      );
    return () => subscription.unsubscribe();
  }, []);

  // function to get the next set of people from the back end
  const fetchPeople = () => {
    fetchedPeopleStream.pipe(take(1)).subscribe(fetchedPeople => {
      const start = fetchedPeople.length;
      getPeople(start, start + 5)
        .then(newPpl => {
          fetchedPeopleStream.next(fetchedPeople.concat(newPpl));
        });
    })
  }

  return (
    <div>
      <div className="forms">
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

      <form>
        <label>
          Eye color:
          <select id="eyeForm" onChange={event => eyeChoice.next(event.target.value)}>
            <option value="all">--</option>
            <option value="brown">Brown</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="hazel">Hazel</option>
          </select>
        </label>
      </form>

      <form>
        <label>
          Hair color:
          <select id="hairForm" onChange={event => hairChoice.next(event.target.value)}>
            <option value="all">--</option>
            <option value="blonde">Blonde</option>
            <option value="brown">Brown</option>
            <option value="red">Red</option>
            <option value="white">White</option>
            <option value="gray">Gray</option>
            <option value="black">Black</option>
          </select>
        </label>
      </form>

      <form>
        <label>
          Wears hat:
          <select id="hatForm" onChange={event => hatChoice.next(event.target.value)}>
            <option value="all">--</option>
            <option value={true}>Hat</option>
            <option value={false}>No hat</option>
          </select>
        </label>
      </form>
      </div>
    
      {/** Knows nothing about the observables, just the data we've filtered through */}
      <List people={filteredPeople} />

      <button onClick={fetchPeople}>
      <span>Load more</span>
    </button>
    </div>
  );
}

export default Guesses;
