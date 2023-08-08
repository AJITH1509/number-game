import { useState, useMemo, useEffect } from "react";
import { MyVerticallyCenteredModal } from "./Modal.jsx";
import { AnswerModal } from "./AnswerModal.jsx";

const GuessingGame = () => {
  const [targetNumber, setTargetNumber] = useState(generateTargetNumber());
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [modalShow, setModalShow] = useState(false);
  const [answerModal, setAnswerModal] = useState(false);
  const playerName = localStorage.getItem("playerName");
  const [score, setScore] = useState(
    parseInt(localStorage.getItem("playerScore")) || 0
  );

  //generate randomm four numbers

  function generateTargetNumber() {
    const digits = [];
    while (digits.length < 4) {
      const digit = Math.floor(Math.random() * 10);
      //checks the number already exists
      if (!digits.includes(digit)) {
        digits.push(digit);
      }
    }

    return digits.join("");
  }
  useEffect(() => {
    const newTargetNumber = generateTargetNumber();
    setTargetNumber(newTargetNumber);
  }, []);

  function handleGuess() {
    if (guess.length !== 4 || isNaN(parseInt(guess))) {
      setFeedback("Invalid guess. Please enter a four-digit number.");
      return;
    }

    setAttempts(attempts + 1);
    const newFeedback = calculateFeedback(guess);
    setGuesses([...guesses, { guess, feedback: newFeedback }]);
    setFeedback(newFeedback);

    if (newFeedback === "++++") {
      const newScore = parseInt(score) + 1; // ParseInt to convert the score to a number
      localStorage.setItem("playerScore", newScore); // Use "playerScore" (consistent with getItem)
      setAttempts(0);
      setScore(newScore); // Update the score state
      setFeedback("Congratulations, Your Guess was correct.");
      setGuess("");
    }
  }

  function calculateFeedback(currentGuess) {
    const feedbackArray = [];
    for (let i = 0; i < 4; i++) {
      if (currentGuess[i] === targetNumber[i]) {
        feedbackArray.push("+");
      } else if (targetNumber.includes(currentGuess[i])) {
        feedbackArray.push("-");
      } else {
        feedbackArray.push("*");
      }
    }
    return feedbackArray.join("");
  }
  //restart game
  const ExitGame = () => {
    localStorage.removeItem("playerName");
    localStorage.removeItem("playerScore");
    setTargetNumber(generateTargetNumber());
    setGuess("");
    setGuesses([]);
    setFeedback("");
    setAttempts(0);
    setModalShow(true);
    setScore(0);
  };
  //new game
  const newGame = () => {
    setGuess("");
    setFeedback("New Numbers Generated, Start Guessing");
    setTargetNumber(generateTargetNumber());
  };

  return (
    <div className="guessing-game-container">
      <h1 className="text-center game-name">
        Guessing <span>Number</span> Game
      </h1>
      {playerName ? (
        <div>
          <button className="mx-2 exit-button" onClick={ExitGame}>
            Exit Game
          </button>
          <button className="start-new-button" onClick={newGame}>
            New Game
          </button>
        </div>
      ) : (
        <button className="start-button" onClick={() => setModalShow(true)}>
          Start Game
        </button>
      )}
      {playerName ? (
        <div className="field-container">
          <p className="player-name">Player name: {playerName}</p>
          <p className="attempts">Attempts: {attempts}</p>
          <p className="attempts">Score:{score}</p>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            className="guess-input"
            placeholder="Enter your guess"
          />
          <button className="guess-button" onClick={handleGuess}>
            Guess
          </button>
          <div className="show-answer" onClick={() => setAnswerModal(true)}>
            show answer
          </div>

          {feedback && <p className="feedback">{feedback}</p>}
        </div>
      ) : null}
      <div className="note">
        <h4>Important Notes</h4>
        <p> + for Number exists in same location</p>
        <p> - for Number exists but not in same location</p>
        <p> * for Number Does not exists</p>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <AnswerModal
        answer={targetNumber}
        show={answerModal}
        onHide={() => setAnswerModal(false)}
      />
    </div>
  );
};

export default GuessingGame;
