import { useState } from 'react';
import { Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

// Replace these with your own messages for Selipher
const loveMessages = [
  {
    id: 1,
    message: "I love how your eyes light up when you laugh",
    color: "text-pink-400",
  },
  {
    id: 2,
    message: "You always know how to make me smile, even on my worst days",
    color: "text-red-500",
  },
  {
    id: 3,
    message: "Your kindness to everyone around you makes me fall in love all over again",
    color: "text-pink-500",
  },
  {
    id: 4,
    message: "I cherish every moment we spend together, even the quiet ones",
    color: "text-pink-600",
  },
  {
    id: 5,
    message: "The way you care for others shows what an amazing person you are",
    color: "text-red-400",
  },
  {
    id: 6,
    message: "Your smile is my favorite sight in the whole world",
    color: "text-pink-500",
  },
  {
    id: 7,
    message: "I love how passionate you are about the things you care about",
    color: "text-red-600",
  }
];

interface LoveNotesProps {
  isVisible: boolean;
}

const LoveNotes = ({ isVisible }: LoveNotesProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");
  
  // Don't render if not visible
  if (!isVisible) return null;
  
  const handleHeartClick = (message: string) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };
  
  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-20">
        <p className="text-center text-sm text-muted-foreground mt-2 mb-10 animate-fade-in">
          Click on the hearts to discover why I love you! 💕
        </p>
        
        {loveMessages.map((item, i) => (
          <Heart
            key={item.id}
            className={`absolute ${item.color} cursor-pointer animate-float-hearts pointer-events-auto hover:scale-125 transition-transform`}
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 15) % 70}%`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0.8,
            }}
            size={24 + (i % 3) * 4}
            onClick={() => handleHeartClick(item.message)}
            fill="currentColor"
          />
        ))}
      </div>
      
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="bg-pink-50 border-primary/20 max-w-[90%] sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-primary">From My Heart to Yours ❤️</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center py-4 text-foreground text-lg">
            {selectedMessage}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoveNotes; 