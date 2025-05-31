import React from 'react';

const RouletteBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1920&auto=format&fit=crop"
        alt="Roulette Background"
        className="w-full h-full object-cover"
        style={{
          filter: 'brightness(0.4) contrast(1.2)'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))'
        }}
      />
    </div>
  );
};

export default RouletteBackground; 