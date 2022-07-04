import React, { useEffect, useState } from "react";
import "./App.css";
import GameMap from "./GameMap";
import RandomWords from "./random-words";
export default function App() {
  const [randomWords, setRandomWords] = useState("", "", "", "", "");
  /*   const words = ["klein", "klein", "klein", "klein", "klein"]; */
  const [currentLine, setCurrentLine] = useState(0);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [textinputs, setTextInputs] = useState([
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
  ]);

  const [rightFields, setRightFields] = useState({
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
  });
  const renderWord = (item, index) => {
    let arr = [];

    [...item].forEach((char, indexChar) =>
      arr.push(
        <p
          key={(char + indexChar).toString()}
          className="letter"
          style={{
            transition:"all 1s",
            backgroundColor:
              rightFields[index]?.includes(indexChar) && "lightGreen",
            margin: 0,
            borderLeftColor:
              indexChar === 0 && currentLine === index && "lightGreen",
            borderLeftWidth: indexChar === 0 && currentLine === index && 4,
          }}
          value={char}
        >
          {char}
        </p>
      )
    );

    return (
      <div key={index} className="word">
        {arr}
      </div>
    );
  };

  const onKeyDown = (event) => {
    let isLetter =
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122);
    if (!isLetter) return;

    let input = textinputs;

    for (let i = 0; i < input.length; i++) {
      let currInput = input[i];
      if (!currInput.includes(" ")) {
        if (i === input.length - 1) {
          cleanLetters();
        }
        setCurrentLine(i + 1);
        continue;
      }

      for (let j = 0; j < currInput.length; j++) {
        if (currInput[j] === " ") {
          currInput = setCharAt(currInput, j, event.key);
          input[i] = currInput;

          if (!currInput.includes(" ")) {
            checkWord(input[i], i);
            finishedGame();
            if (i === input.length - 1) {
              cleanLetters();
              setCurrentLine(getFirstLine());
            }
          }
          break;
        }
      }

      break;
    }
    setTextInputs([...input]);
  };

  const finishedGame = () => {
    let finished = checkFinished();
    if (finished) {
      let timeswon = localStorage.getItem("timesWon");
      if (timeswon) timeswon = parseInt(timeswon) + 1;
      else timeswon = 1;
      localStorage.setItem("timesWon", timeswon);
      setShowPlayAgain(true);
    }
  };

  const checkFinished = () => {
    let rightfields = rightFields;
    let finished = true;
    for (let item in rightfields) {
      if (rightFields[item].length < 5) {
        finished = false;
      }
    }

    return finished;
  };
  const getFirstLine = () => {
    let inputs = textinputs;

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].includes(" ")) {
        return i;
      }
    }
  };
  const cleanLetters = () => {
    let input = textinputs;
    let rightfields = rightFields;

    for (let i = 0; i < input.length; i++) {
      let currInput = input[i];
      for (let j = 0; j < currInput.length; j++) {
        if (!rightfields[i].includes(j)) {
          currInput = setCharAt(currInput, j, " ");
          input[i] = currInput;
        }
      }
    }
    setTextInputs([...input]);
  };

  const checkWord = (word, index) => {
    let rightfields = rightFields;
    for (let i = 0; i < word.length; i++) {
      if (
        randomWords[index][i] === word[i] &&
        !rightfields[index].includes(i)
      ) {
        rightfields[index].push(i);
      }
    }
    setRightFields(rightFields);
  };

  const setCharAt = (str, index, chr) => {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  };
  const resetState = () => {
    setCurrentLine(0);
    setTextInputs(["     ", "     ", "     ", "     ", "     "]);
    setRightFields({
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
    });
    setShowPlayAgain(false);
  };
  useEffect(() => {
    setRandomWords(RandomWords({ exactly: 5, maxLength: 5, minLength: 5 }));
  }, [showPlayAgain]);
  let timeswon = localStorage.getItem("timesWon") || 0;
  return (
    <div
      className="container"
      tabIndex="0"
      onKeyDown={onKeyDown}
      key="container"
    >
      <div>Times Won: {timeswon}</div>

      <GameMap key="map">
        {showPlayAgain && (
          <input
            type={"button"}
            onClick={resetState}
            title="Play again"
            value="play again"
          ></input>
        )}
        {textinputs.map((item, index) => renderWord(item, index))}
      </GameMap>
    </div>
  );
}
