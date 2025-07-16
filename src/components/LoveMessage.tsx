import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface LoveMessageProps {
  isVisible: boolean;
}

const LoveMessage = ({ isVisible }: LoveMessageProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Delay the message appearance for dramatic effect
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className={`surprise-message ${showMessage ? 'show' : ''} max-w-2xl mx-auto`}>
      <Card className="bg-gradient-to-br from-background to-card border-2 border-primary/20 shadow-2xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Header with hearts */}
          <div className="flex justify-center items-center space-x-2">
            <Heart className="text-primary animate-heart-burst" size={32} />
            <h2 className="text-3xl font-bold text-primary">Happy Birthday, Selipher!</h2>
            <Heart className="text-primary animate-heart-burst" size={32} />
          </div>

          {/* Main message */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="text-6xl">🎂🎉</div>
            </div>
            
            <p className="text-lg text-foreground leading-relaxed">
              🎈 Happy Birthday, Selipher! 🎂🎉<br />
              Thank you for making every day feel like a romantic movie, for making my world go round, and for making my heart skip a beat!<br />
              I love you more than pizza, Netflix, and naps combined... and that's saying A LOT. 😍🍕❤️<br />
              Have the best day ever, my beautiful Babey! 💖✨
            </p>
            
            <div className="flex justify-center">
              <Heart className="text-primary animate-romantic-glow" size={48} />
            </div>
          </div>

          {/* Cute GIF placeholder */}
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20">
            <div className="text-center space-y-2">
              <div className="text-4xl">🌹💐🥰</div>
              <p className="text-sm text-muted-foreground">
                Imagine the cutest love and flowers GIF here! 💕
              </p>
            </div>
          </div>

          {/* Sparkles decoration */}
          <div className="flex justify-center space-x-4">
            <Sparkles className="text-accent animate-romantic-glow" size={24} />
            <Sparkles className="text-accent animate-romantic-glow" size={28} />
            <Sparkles className="text-accent animate-romantic-glow" size={24} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoveMessage;