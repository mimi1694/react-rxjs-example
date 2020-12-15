import './App.css';
import AsyncGuesses from './AsyncGuesses';
import Guesses from './Guesses';

function App() {

  return (
    <div className="App">
      <h1>Guess Who!</h1>
      <div className="split-screen">
        <Guesses />
        <AsyncGuesses />
      </div>
    </div>
  );
}

export default App;
