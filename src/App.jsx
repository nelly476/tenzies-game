import { useState, useEffect } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstVal = dice[0].value;
    const allSameVal = dice.every((die) => die.value === firstVal);

    if (allHeld && allSameVal) {
      setTenzies(true);
    }
  }, [dice]);

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  const diceElements = dice.map((number) => {
    return (
      <Die
        value={number.value}
        key={number.id}
        isHeld={number.isHeld}
        holdDice={holdDice}
        id={number.id}
      />
    );
  });

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function changeDice() {
    if (tenzies) {
      setTenzies(false);
      setDice(allNewDice());
    } else {
      setNumber((prevNum) => prevNum + 1);
      setDice((prevDice) =>
        prevDice.map((die) => {
          const id = nanoid();
          return die.isHeld ? die : generateNewDie();
        })
      );
    }
  }

  function holdDice(dieId) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id == dieId ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  return (
    <main>
      {tenzies ? <Confetti /> : <></>}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={changeDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <h3>Number of rolls: {number}</h3>
    </main>
  );
}

export default App;
