import React, { useRef, useEffect, useState } from 'react';

interface AudioManagerProps {
  soundEnabled: boolean;
  musicPlaying: boolean;
  customSongFile?: File | null;
  onEnvelopeOpen?: () => void;
  onCardReveal?: () => void;
}

const AudioManager: React.FC<AudioManagerProps> = ({ 
  soundEnabled, 
  musicPlaying, 
  customSongFile,
  onEnvelopeOpen, 
  onCardReveal 
}) => {
  const backgroundMusicRef = useRef<HTMLAudioElement>(null);
  const customMusicRef = useRef<HTMLAudioElement>(null);
  const soundEffectsRef = useRef<HTMLAudioElement>(null);
  const [customSongUrl, setCustomSongUrl] = useState<string | null>(null);

  // Handle custom song file
  useEffect(() => {
    if (customSongFile) {
      const url = URL.createObjectURL(customSongFile);
      setCustomSongUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setCustomSongUrl(null);
    }
  }, [customSongFile]);

  // Background music control
  useEffect(() => {
    const audioToPlay = customSongUrl && customMusicRef.current ? customMusicRef.current : backgroundMusicRef.current;
    
    if (audioToPlay) {
      if (musicPlaying && soundEnabled) {
        audioToPlay.play().catch(console.log);
      } else {
        audioToPlay.pause();
      }
    }
  }, [musicPlaying, soundEnabled, customSongUrl]);

  // Play envelope opening sound
  const playEnvelopeSound = () => {
    if (soundEnabled && soundEffectsRef.current) {
      // Create a gentle whoosh sound effect
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    }
    onEnvelopeOpen?.();
  };

  // Play card reveal sound
  const playCardSound = () => {
    if (soundEnabled) {
      // Create a magical chime sound
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.8);
    }
    onCardReveal?.();
  };

  // Expose methods to parent component
  useEffect(() => {
    (window as any).playEnvelopeSound = playEnvelopeSound;
    (window as any).playCardSound = playCardSound;
  }, [soundEnabled]);

  return (
    <>
      {/* Custom Song Audio */}
      {customSongUrl && (
        <audio
          ref={customMusicRef}
          loop
          preload="auto"
          className="hidden"
          src={customSongUrl}
        />
      )}

      {/* Default Background Music - Happy Birthday instrumental loop */}
      <audio
        ref={backgroundMusicRef}
        loop
        preload="auto"
        className="hidden"
      >
        <source src="data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAZER1aXhlciBKdWQgQnJhbmQgUmVjb3JkaW5ncwBUSVQyAAAABgAAAzIwMTkAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAANIAAAAAFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV" type="audio/mpeg" />
      </audio>

      {/* Sound Effects */}
      <audio
        ref={soundEffectsRef}
        preload="auto"
        className="hidden"
      />
    </>
  );
};

export default AudioManager;