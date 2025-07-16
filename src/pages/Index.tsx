import { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import SurpriseBox from '@/components/SurpriseBox';
import LoveMessage from '@/components/LoveMessage';
import MusicPlayer from '@/components/MusicPlayer';
import PhotoGallery from '@/components/PhotoGallery';
import LoveNotes from '@/components/LoveNotes';
import { useToast } from '@/components/ui/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isBoxOpened, setIsBoxOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Function to try playing audio directly
  const tryPlayAudio = async () => {
    const audio = document.getElementById('bgMusic') as HTMLAudioElement;
    if (!audio) return;

    try {
      await audio.play();
      console.log('Audio started successfully');
    } catch (error) {
      console.error('Failed to autoplay audio:', error);
      // Show a toast notification if audio fails to play
      toast({
        title: "Audio couldn't autoplay",
        description: "Click the play button to start the music!",
        duration: 5000,
      });
    }
  };

  const handleBoxOpen = () => {
    setIsBoxOpened(true);
    setIsMusicPlaying(true);
    
    // Try to play music immediately after box opens
    setTimeout(() => {
      tryPlayAudio();
    }, 100);
  };

  const handleMusicToggle = () => {
    setIsMusicPlaying(!isMusicPlaying);
  };

  // Force attempt to play music if box is opened
  useEffect(() => {
    if (isBoxOpened) {
      setIsMusicPlaying(true);
      tryPlayAudio();
    }
  }, [isBoxOpened]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Heart className="absolute top-10 left-10 text-primary/20 animate-float-hearts" size={isMobile ? 24 : 32} />
        <Sparkles className="absolute top-20 right-20 text-accent/30 animate-romantic-glow" size={isMobile ? 20 : 28} />
        <Heart className="absolute bottom-20 left-20 text-primary/20 animate-float-hearts" size={isMobile ? 18 : 24} />
        <Sparkles className="absolute bottom-10 right-10 text-accent/30 animate-romantic-glow" size={isMobile ? 24 : 32} />
        <Heart className="absolute top-1/2 left-5 text-primary/20 animate-float-hearts" size={isMobile ? 16 : 20} />
        <Sparkles className="absolute top-1/3 right-5 text-accent/30 animate-romantic-glow" size={isMobile ? 18 : 24} />
      </div>

      {/* Main content */}
      <div className="z-10 w-full max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className={`${isMobile ? 'text-4xl' : 'text-5xl'} font-bold text-primary mb-4 animate-romantic-glow`}>
            🎉 Happy Birthday, Selipher! 🎉
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A special surprise just for you! 💕
          </p>
        </div>

        {/* Surprise Box */}
        <div className="mb-8 md:mb-12">
          <SurpriseBox onOpen={handleBoxOpen} />
        </div>

        {/* Love Message */}
        <LoveMessage isVisible={isBoxOpened} />
        
        {/* Photo Gallery - appears when the box is opened */}
        <PhotoGallery isVisible={isBoxOpened} />
      </div>

      {/* Interactive Love Notes - appears when box is opened */}
      <LoveNotes isVisible={isBoxOpened} />

      {/* Music Player - Always render it but only show when box is opened */}
      <MusicPlayer 
        isPlaying={isMusicPlaying} 
        onTogglePlay={handleMusicToggle} 
      />

      {/* Additional romantic elements */}
      {isBoxOpened && (
        <div className="fixed inset-0 pointer-events-none z-0">
          {Array.from({ length: isMobile ? 12 : 20 }, (_, i) => (
            <div key={i}>
              <Heart
                className="absolute text-primary/10 animate-float-hearts"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  fontSize: `${Math.random() * (isMobile ? 10 : 15) + (isMobile ? 8 : 10)}px`,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
