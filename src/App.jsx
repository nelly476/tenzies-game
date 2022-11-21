import { useState } from "react";
import Die from "./components/Die";
import "./App.css";
import { nanoid } from "nanoid";

function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      let num = Math.floor(Math.random() * 6) + 1;
      newDice.push({
        value: num,
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());

  const diceElements = dice.map((number) => {
    return <Die value={number.value} key={number.id} />;
  });

  function changeDice() {
    setDice(allNewDice());
  }

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={changeDice}>
        Roll
      </button>
    </main>
  );
}

export default App;
