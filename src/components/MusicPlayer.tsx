import { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Import the audio file directly (this creates a URL to the file in the build)
import audioFile from '@/assets/romantic-guitar.mp3';

interface MusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

const MusicPlayer = ({ isPlaying, onTogglePlay }: MusicPlayerProps) => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Ensure audio is loaded
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      console.log('Audio can play now');
      setAudioLoaded(true);
    };

    audio.addEventListener('canplay', handleCanPlay);
    
    // Set volume to ensure it's audible
    audio.volume = 0.8;

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const attemptPlayback = async () => {
      if (isPlaying) {
        try {
          await audio.play();
          console.log('Playing audio');
        } catch (error) {
          console.error('Failed to play audio:', error);
        }
      } else {
        audio.pause();
        console.log('Paused audio');
      }
    };

    if (audioLoaded) {
      attemptPlayback();
    } else {
      audio.addEventListener('canplay', attemptPlayback, { once: true });
    }
    
    return () => {
      audio.removeEventListener('canplay', attemptPlayback);
    };
  }, [isPlaying, audioLoaded]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      setDuration(audio.duration);
      console.log('Audio duration:', audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('play', () => console.log('Audio play event fired'));
    audio.addEventListener('pause', () => console.log('Audio pause event fired'));
    audio.addEventListener('error', (e) => console.error('Audio error:', e));

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('play', () => console.log('Audio play event fired'));
      audio.removeEventListener('pause', () => console.log('Audio pause event fired'));
      audio.removeEventListener('error', (e) => console.error('Audio error:', e));
    };
  }, []);

  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Always render the audio element but only show controls when needed */}
      <audio
        id="bgMusic"
        ref={audioRef}
        loop
        preload="auto"
        src={audioFile}
        style={{ display: 'none' }}
      />
      
      {/* Only show player UI if needed */}
      <div className={`fixed bottom-4 right-4 bg-card/80 backdrop-blur-md rounded-lg p-4 border border-primary/20 shadow-lg z-50 transition-opacity duration-300 ${!isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onTogglePlay}
            className="hover:bg-primary/20"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 text-primary" />
            ) : (
              <Play className="h-4 w-4 text-primary" />
            )}
          </Button>

          <div className="flex-1 min-w-0">
            <div className="text-xs text-muted-foreground">
              Romantic Birthday Music 🎵
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTime(currentTime)} / {duration ? formatTime(duration) : '0:00'}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleMuteToggle}
            className="hover:bg-primary/20"
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-primary" />
            ) : (
              <Volume2 className="h-4 w-4 text-primary" />
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;