import { useState } from "react";

function NewGame({ onSave }) {
  const [p1Name, changeP1Name] = useState("");
  const [p2Name, changeP2Name] = useState("");

  const onChangeP1Name = (event) => {
    changeP1Name(event.target.value);
  };
  const onChangeP2Name = (event) => {
    changeP2Name(event.target.value);
  };

  return (
    <div className="container flex justify-center">
      <div className="lg:w-4/12 w-6/12">
        <div className="text-xl font-bold my-8">New Game</div>
        <div className="flex flex-col justify-between gap-8">
          <input
            className="block w-full bg-tertiary-300 p-4 outline-none"
            value={p1Name}
            onChange={onChangeP1Name}
            placeholder="Player 1"
          ></input>
          <input
            value={p2Name}
            onChange={onChangeP2Name}
            className="block w-full bg-tertiary-300 p-4 outline-none"
            placeholder="Player 2"
          ></input>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() =>
              onSave({
                player1: { name: p1Name, authority: 50 },
                player2: { name: p2Name, authority: 50 },
                turn: 1,
              })
            }
            className="primary-button my-8"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewGame;
