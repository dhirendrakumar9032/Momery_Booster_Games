import { message } from 'antd';
import React, { useState, useEffect } from 'react';

const PatternMemory: React.FC = () => {
  const gridSize = 4;
  const [pattern, setPattern] = useState<boolean[]>([]);
  const [playerPattern, setPlayerPattern] = useState<boolean[]>([]);
  const [isShowing, setIsShowing] = useState(true);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const generatePattern = () => {
    const patternCount = Math.min(3 + level, 12);
    const newPattern = Array(gridSize * gridSize).fill(false);
    let count = 0;
    while (count < patternCount) {
      const index = Math.floor(Math.random() * (gridSize * gridSize));
      if (!newPattern[index]) {
        newPattern[index] = true;
        count++;
      }
    }
    return newPattern;
  };

  const startNewRound = () => {
    setPlayerPattern(Array(gridSize * gridSize).fill(false));
    setPattern(generatePattern());
    setIsShowing(true);
    setTimeout(() => {
      setIsShowing(false);
    }, 2000 + (level * 500));
  };

  useEffect(() => {
    startNewRound();
  }, [level]);

  const handleCellClick = (index: number) => {
    if (isShowing) return;

    const newPlayerPattern = [...playerPattern];
    newPlayerPattern[index] = !newPlayerPattern[index];
    setPlayerPattern(newPlayerPattern);
  };

  const checkPattern = () => {
    const correct = pattern.every((cell, index) => cell === playerPattern[index]);
    if (correct) {
      setScore(score + level * 100);
      setLevel(level + 1);
      message.success('Perfect! You are making great.')
    } else {
      setScore(Math.max(0, score - 50));
      startNewRound();
      message.error('Wrong! need more concentration.')
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Pattern Memory</h2>
        <div className="flex justify-center space-x-8">
          <p className="text-lg">Level: {level}</p>
          <p className="text-lg">Score: {score}</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 max-w-md mx-auto mb-8">
        {(isShowing ? pattern : playerPattern).map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            disabled={isShowing}
            className={`w-16 h-16 rounded-lg transition-all duration-200 ${
              cell
                ? 'bg-indigo-500'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>

      {!isShowing && (
        <div className="text-center">
          <button
            onClick={checkPattern}
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Check Pattern
          </button>
        </div>
      )}
    </div>
  );
};

export default PatternMemory;