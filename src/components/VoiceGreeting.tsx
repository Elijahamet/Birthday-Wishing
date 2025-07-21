import React, { useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VoiceGreetingProps {
  recipientName: string; // Name to include in greeting
  isVisible: boolean;    // Whether to show the button
}

const VoiceGreeting: React.FC<VoiceGreetingProps> = ({ 
  recipientName, 
  isVisible 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVoiceGreeting = async () => {
    try {
      setIsPlaying(true);

      // Replace API call with your own audio file
      const audio = new Audio('/audio/happy-birthday.mp3');

      // Optional: Say recipient's name before playing audio
      console.log(`Playing greeting for ${recipientName}`);

      // When audio ends, reset playing state
      audio.onended = () => {
        setIsPlaying(false);
      };

      await audio.play();
    } catch (error) {
      console.error('Audio playback error:', error);
      setIsPlaying(false);
      alert('Unable to play the birthday greeting audio.');
    }
  };

  // If not visible, render nothing
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
      <Button
        variant="luxury"
        size="lg"
        onClick={playVoiceGreeting}
        disabled={isPlaying}
        className="animate-bounce-soft"
      >
        {isPlaying ? (
          <>
            <MicOff className="w-5 h-5 animate-pulse" />
            Playing Voice Greeting...
          </>
        ) : (
          <>
            <Mic className="w-5 h-5" />
            🎤 Play Voice Birthday Greeting
          </>
        )}
      </Button>
    </div>
  );
};

export default VoiceGreeting;
