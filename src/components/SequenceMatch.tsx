import React, { useState, useEffect } from 'react';

const SequenceMatch: React.FC = () => {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const generateSequence = () => {
    const newSequence = [...sequence, Math.floor(Math.random() * 4)];
    setSequence(newSequence);
    return newSequence;
  };

  const playSequence = async (seq: number[]) => {
    setIsPlaying(true);
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const button = document.getElementById(`button-${seq[i]}`);
      button?.classList.add('bg-indigo-400');
      await new Promise(resolve => setTimeout(resolve, 500));
      button?.classList.remove('bg-indigo-400');
    }
    setIsPlaying(false);
  };

  const handleButtonClick = (index: number) => {
    if (isPlaying) return;

    const newPlayerSequence = [...playerSequence, index];
    setPlayerSequence(newPlayerSequence);

    if (newPlayerSequence[newPlayerSequence.length - 1] !== sequence[newPlayerSequence.length - 1]) {
      setGameOver(true);
      return;
    }

    if (newPlayerSequence.length === sequence.length) {
      setScore(score + sequence.length * 100);
      setPlayerSequence([]);
      setTimeout(() => {
        const newSeq = generateSequence();
        playSequence(newSeq);
      }, 1000);
    }
  };

  const startGame = () => {
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    setGameOver(false);
    setTimeout(() => {
      const newSeq = generateSequence();
      playSequence(newSeq);
    }, 500);
  };

  useEffect(() => {
    if (sequence.length === 0 && !gameOver) {
      startGame();
    }
  }, []);

  const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500'];

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sequence Match</h2>
        <p className="text-lg">Score: {score}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-8">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            id={`button-${index}`}
            onClick={() => handleButtonClick(index)}
            disabled={isPlaying || gameOver}
            className={`${colors[index]} h-32 rounded-lg transition-all duration-200 hover:opacity-80`}
          />
        ))}
      </div>

      {gameOver && (
        <div className="text-center">
          <p className="text-xl mb-4">Game Over! Final Score: {score}</p>
          <button
            onClick={startGame}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default SequenceMatch;