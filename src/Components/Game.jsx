import React, { useState } from "react";
import '../assets/Game.css'

const Game = () => {
    const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");

    function generateRandomNumber() {
        return Math.floor(Math.random() * 100) + 1;
    }

    const handleGuess = () => {
        const userGuess = parseInt(guess, 10);
        if (userGuess === randomNumber) {
            setMessage("🎉 Correct! You guessed it!");
            setRandomNumber(generateRandomNumber());
        } else if (userGuess < randomNumber) {
            setMessage("📉 Too Low! Try Again.");
        } else {
            setMessage("📈 Too High! Try Again.");
        }
        setGuess("");
    };

    return (
        <div className="game">
            <h1>Guess the Number!</h1>
            <p>I'm thinking of a number between 1 and 100.</p>
            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess"
            />
            <button onClick={handleGuess}>Submit Guess</button>
            <p>{message}</p>
        </div>
    );
};

export default Game;
