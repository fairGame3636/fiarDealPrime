import React, { useState } from 'react';

const RouletteGif = ({ size = 150 }) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  if (error) {
    return (
      <div 
        className="flex items-center justify-center rounded-full bg-primary/50"
        style={{ width: size, height: size }}
      >
        <span className="text-accent text-2xl">🎲</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <img
        src="/assets/Spin Spinning GIF by Sealed With A GIF.gif"
        alt="Roulette Animation"
        style={{
          width: size,
          height: size,
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 10px rgba(76, 175, 80, 0.5))'
        }}
        className="rounded-full"
        draggable={false}
        onError={handleError}
      />
    </div>
  );
};

export default RouletteGif; 