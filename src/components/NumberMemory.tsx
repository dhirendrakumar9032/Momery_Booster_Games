import React, { useState, useEffect } from 'react';

const NumberMemory: React.FC = () => {
  const [number, setNumber] = useState<string>('');
  const [userInput, setUserInput] = useState<string>('');
  const [showNumber, setShowNumber] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<'showing'|'input'|'result'>('showing');

  useEffect(() => {
    if (gameState === 'showing') {
      generateNumber();
      const timer = setTimeout(() => {
        setShowNumber(false);
        setGameState('input');
      }, 2000 + (level * 500));
      return () => clearTimeout(timer);
    }
  }, [level, gameState]);

  const generateNumber = () => {
    setNumber(Math.random().toString().slice(2, 2 + level + 2));
    setShowNumber(true);
  };

  const handleSubmit = () => {
    if (userInput === number) {
      setScore(score + level * 100);
      setLevel(level + 1);
    } else {
      setScore(Math.max(0, score - 50));
    }
    setGameState('result');
  };

  const startNewRound = () => {
    setUserInput('');
    setGameState('showing');
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Number Memory</h2>
        <div className="flex justify-center space-x-8">
          <p className="text-lg">Level: {level}</p>
          <p className="text-lg">Score: {score}</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-6">
        {gameState === 'showing' && (
          <div className="text-4xl font-bold text-indigo-600 h-20 flex items-center">
            {number}
          </div>
        )}

        {gameState === 'input' && (
          <>
            <input
              type="number"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="text-center text-2xl p-4 border-2 border-indigo-200 rounded-lg w-48"
              placeholder="Enter number"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Submit
            </button>
          </>
        )}

        {gameState === 'result' && (
          <div className="text-center">
            <p className="text-xl mb-4">
              {userInput === number ? (
                <span className="text-green-600">Correct! +{level * 100} points</span>
              ) : (
                <span className="text-red-600">
                  Wrong! The number was {number}
                </span>
              )}
            </p>
            <button
              onClick={startNewRound}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Next Round
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumberMemory;