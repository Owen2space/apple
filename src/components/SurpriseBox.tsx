import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles } from 'lucide-react';
import giftBoxClosed from '@/assets/gift-box-closed.png';
import giftBoxOpened from '@/assets/gift-box-opened.png';

interface SurpriseBoxProps {
  onOpen: () => void;
}

const SurpriseBox = ({ onOpen }: SurpriseBoxProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleBoxClick = () => {
    if (isOpened) return;
    
    setIsOpened(true);
    setShowConfetti(true);
    onOpen();
    
    // Try to play audio directly after user interaction
    const audioElement = document.getElementById('bgMusic') as HTMLAudioElement;
    if (audioElement) {
      const playPromise = audioElement.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio playback started successfully');
          })
          .catch(error => {
            console.error('Audio playback failed:', error);
          });
      }
    }
    
    // Trigger confetti burst
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6347', '#ffd700'];

    (function frame() {
      confetti({
        particleCount: 7,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 7,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Heart shaped confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 360,
        origin: { x: 0.5, y: 0.5 },
        colors: colors,
        shapes: ['heart'],
      });
    }, 500);
  };

  useEffect(() => {
    if (showConfetti) {
      // Create floating hearts
      const hearts = Array.from({ length: 12 }, (_, i) => (
        <Heart
          key={i}
          className={`floating-heart text-primary animate-float-hearts`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            fontSize: `${Math.random() * 20 + 10}px`,
          }}
        />
      ));

      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [showConfetti]);

  return (
    <div className="relative flex flex-col items-center justify-center space-y-8">
      {/* Gift Box */}
      <div
        className={`gift-box ${isOpened ? 'animate-gift-box-open' : ''} relative cursor-pointer`}
        onClick={handleBoxClick}
      >
        <div className="romantic-glow">
          <img
            src={isOpened ? giftBoxOpened : giftBoxClosed}
            alt="Gift Box"
            className="w-64 h-64 object-contain"
          />
        </div>
        
        {/* Sparkles around the box */}
        {!isOpened && (
          <>
            <Sparkles className="absolute -top-4 -left-4 text-accent animate-romantic-glow" size={24} />
            <Sparkles className="absolute -top-4 -right-4 text-accent animate-romantic-glow" size={20} />
            <Sparkles className="absolute -bottom-4 -left-4 text-accent animate-romantic-glow" size={18} />
            <Sparkles className="absolute -bottom-4 -right-4 text-accent animate-romantic-glow" size={22} />
          </>
        )}
      </div>

      {/* Click instruction */}
      {!isOpened && (
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-primary">
            Click to open your surprise! 🎁
          </p>
          <p className="text-lg text-muted-foreground">
            Something special is waiting for you...
          </p>
        </div>
      )}

      {/* Floating hearts when opened */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-10">
          {Array.from({ length: 12 }, (_, i) => (
            <Heart
              key={i}
              className="floating-heart text-primary"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                fontSize: `${Math.random() * 20 + 15}px`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SurpriseBox;