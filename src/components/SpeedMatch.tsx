import React, { useState, useEffect } from 'react';

const SpeedMatch: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const [previousCard, setPreviousCard] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);

  const generateCard = () => Math.floor(Math.random() * 9) + 1;

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGameActive(true);
    setCurrentCard(generateCard());
    setPreviousCard(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameActive(false);
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft]);

  const handleAnswer = (isMatch: boolean) => {
    const actualMatch = previousCard === currentCard;
    
    if (isMatch === actualMatch) {
      setScore(score + 100);
      setStreak(streak + 1);
    } else {
      setScore(Math.max(0, score - 50));
      setStreak(0);
    }

    setPreviousCard(currentCard);
    setCurrentCard(generateCard());
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Speed Match</h2>
        <div className="flex justify-center space-x-8">
          <p className="text-lg">Score: {score}</p>
          <p className="text-lg">Streak: {streak}</p>
          <p className="text-lg">Time: {timeLeft}s</p>
        </div>
      </div>

      {!gameActive ? (
        <div className="text-center">
          <button
            onClick={startGame}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Start Game
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-8 relative">
            {previousCard && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-50">
                <div className="w-24 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                  <span className="text-4xl">{previousCard}</span>
                </div>
              </div>
            )}
            <div className="w-32 h-44 bg-white border-4 border-indigo-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-6xl">{currentCard}</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={() => handleAnswer(true)}
              className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Match
            </button>
            <button
              onClick={() => handleAnswer(false)}
              className="bg-red-500 text-white px-8 py-3 rounded-lg hover:bg-red-600 transition-colors"
            >
              Different
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeedMatch;