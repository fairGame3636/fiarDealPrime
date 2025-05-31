import React, { useEffect, useRef } from 'react';

const RouletteAnimation = ({ size = 200, speed = 2, color = '#4CAF50' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Roulette numbers in order
    const numbers = [
      0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    const drawWheel = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 10;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw outer circle with gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.8,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, '#2C3E50');
      gradient.addColorStop(1, '#1A1A1A');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Draw inner circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.9, 0, Math.PI * 2);
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw pockets
      for (let i = 0; i < 37; i++) {
        const pocketAngle = (i * (360 / 37) + angle) * (Math.PI / 180);
        const x = centerX + (radius * 0.85) * Math.cos(pocketAngle);
        const y = centerY + (radius * 0.85) * Math.sin(pocketAngle);

        // Draw pocket
        ctx.beginPath();
        ctx.arc(x, y, radius * 0.05, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? '#4CAF50' : (i % 2 === 0 ? '#E74C3C' : '#2C3E50');
        ctx.fill();

        // Draw number
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(pocketAngle + Math.PI / 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `${radius * 0.08}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(numbers[i].toString(), 0, 0);
        ctx.restore();
      }

      // Draw center circle with gradient
      const centerGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius * 0.15
      );
      centerGradient.addColorStop(0, '#4CAF50');
      centerGradient.addColorStop(1, '#2E7D32');

      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      // Draw center border
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.15, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw ball
      const ballAngle = (angle * 2) * (Math.PI / 180);
      const ballX = centerX + (radius * 0.7) * Math.cos(ballAngle);
      const ballY = centerY + (radius * 0.7) * Math.sin(ballAngle);

      const ballGradient = ctx.createRadialGradient(
        ballX - 3, ballY - 3, 0,
        ballX, ballY, radius * 0.03
      );
      ballGradient.addColorStop(0, '#FFFFFF');
      ballGradient.addColorStop(1, '#E0E0E0');

      ctx.beginPath();
      ctx.arc(ballX, ballY, radius * 0.03, 0, Math.PI * 2);
      ctx.fillStyle = ballGradient;
      ctx.fill();

      // Update angle
      angle += speed;
      if (angle >= 360) angle = 0;

      animationFrameId = requestAnimationFrame(drawWheel);
    };

    drawWheel();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [speed, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className="mx-auto"
    />
  );
};

export default RouletteAnimation; 