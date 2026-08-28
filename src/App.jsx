import "./App.css";
import { OPTIONS, WINNER_COMBOS } from "./constants";
import { useState } from "react";

function App() {
  const [turno, setTurno] = useState(true);

  const [board, setBoard] = useState({
    player1: OPTIONS.Nothing,
    player2: OPTIONS.Nothing,
  });
  const [score, setScore] = useState([0, 0]);

  const getRandomOption = () => {
    const options = [OPTIONS.Rock, OPTIONS.Paper, OPTIONS.Scissor];
    const randomIndex = Math.floor(Math.random() * options.length);

    return options[randomIndex];
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleClickOption = (option) => {
    if (turno) {
      const newBoard = {
        player1: option,
        player2: getRandomOption(),
      };
      setBoard(newBoard);
      setTurno(false);
      verifyWinner(newBoard);
    }
  };

  const wipeBoard = () => {
    setBoard({
      player1: OPTIONS.Nothing,
      player2: OPTIONS.Nothing,
    });
    setTurno(true);
  };

  const verifyWinner = async (board) => {
    if (board.player1 === board.player2) {
      await sleep(2000);
      wipeBoard();
      return;
    }

    for (const combo of WINNER_COMBOS) {
      const [option1, option2] = combo;
      if (board.player1 === option1 && board.player2 === option2) {
        const newScore = [score[0] + 1, score[1]];
        setScore(newScore);
        await sleep(1000);
        wipeBoard();
        return;
      }
    }
    const newScore = [score[0], score[1] + 1];
    setScore(newScore);
    await sleep(2000);
    wipeBoard();
  };

  const handleClickReset = () => {
    setBoard({
      player1: OPTIONS.Nothing,
      player2: OPTIONS.Nothing,
    });
    setScore([0, 0]);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Rock Paper Scissor</h1>
        <div className="board">
          <div className="player-square">
            <h2 className="player-title">You</h2>
            <div className="option-square">{board.player1}</div>
          </div>
          <div className="player-score">
            <span>{score[0]}</span>
            <span>-</span>
            <span>{score[1]}</span>
          </div>
          <div className="player-square">
            <h2 className="player-title">Bot</h2>
            <div className="option-square">{board.player2}</div>
          </div>
        </div>
        <div className="tools">
          <div
            className="option"
            onClick={() => handleClickOption(OPTIONS.Rock)}
          >
            {OPTIONS.Rock}
          </div>
          <div
            className="option"
            onClick={() => handleClickOption(OPTIONS.Paper)}
          >
            {OPTIONS.Paper}
          </div>
          <div
            className="option"
            onClick={() => handleClickOption(OPTIONS.Scissor)}
          >
            {OPTIONS.Scissor}
          </div>
        </div>
        <button className="btn-restart" onClick={handleClickReset}>
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
