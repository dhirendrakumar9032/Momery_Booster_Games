import React, { useState } from 'react';
import { Brain, Grid, Shapes, Timer } from 'lucide-react';
import NumberMemory from './components/NumberMemory';
import SequenceMatch from './components/SequenceMatch';
import PatternMemory from './components/PatternMemory';
import SpeedMatch from './components/SpeedMatch';

function App() {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const games = [
    {
      id: 'number-memory',
      title: 'Number Memory',
      description: 'Remember and recall number sequences',
      icon: Timer,
      component: NumberMemory,
    },
    {
      id: 'sequence-match',
      title: 'Sequence Match',
      description: 'Match patterns in the correct order',
      icon: Grid,
      component: SequenceMatch,
    },
    {
      id: 'pattern-memory',
      title: 'Pattern Memory',
      description: 'Memorize and reproduce visual patterns',
      icon: Shapes,
      component: PatternMemory,
    },
    {
      id: 'speed-match',
      title: 'Speed Match',
      description: 'Quick card matching challenge',
      icon: Brain,
      component: SpeedMatch,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">Memory Booster</h1>
          <p className="text-lg text-gray-600">Train your brain with engaging memory games</p>
        </header>

        {!activeGame ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <game.icon className="w-12 h-12 text-indigo-600 mb-4" />
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{game.title}</h2>
                  <p className="text-gray-600">{game.description}</p>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setActiveGame(null)}
              className="mb-6 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center"
            >
              ← Back to Games
            </button>
            {games.find(game => game.id === activeGame)?.component && 
              React.createElement(games.find(game => game.id === activeGame)!.component)}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;