import React, { useState, useEffect } from 'react';
import { Gift, Heart, Sparkles, Star } from 'lucide-react';
import AudioManager from './AudioManager';
import VoiceGreeting from './VoiceGreeting';
import birthdayMain from '@/assets/birthday-main.jpg';
import birthdayFriends from '@/assets/birthday-friends.jpg';
import birthdayCake from '@/assets/birthday-cake.jpg';
import birthdayFamily from '@/assets/birthday-family.jpg';

interface BirthdayEnvelopeProps {
  recipientName?: string;
  message?: string;
  soundEnabled?: boolean;
  musicPlaying?: boolean;
  customSongFile?: File | null;
  apiKey?: string;
}

const BirthdayEnvelope: React.FC<BirthdayEnvelopeProps> = ({
  recipientName = "Beautiful Soul",
  message = "Happy Birthday! 🎉 Wishing you all the joy, love, and laughter in the world. You deserve the very best today and always. 💖",
  soundEnabled = true,
  musicPlaying = false,
  customSongFile = null,
  apiKey
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [playingSound, setPlayingSound] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setPlayingSound(true);
      
      // Play envelope opening sound
      if ((window as any).playEnvelopeSound) {
        (window as any).playEnvelopeSound();
      }
      
      // Sequence the animations
      setTimeout(() => {
        setShowCard(true);
        if ((window as any).playCardSound) {
          (window as any).playCardSound();
        }
      }, 800);
      setTimeout(() => setShowPhotos(true), 1600);
      setTimeout(() => setShowMessage(true), 2400);
      setTimeout(() => setShowConfetti(true), 2800);
    }
  };

  const handleReset = () => {
    setIsOpened(false);
    setShowCard(false);
    setShowConfetti(false);
    setShowPhotos(false);
    setShowMessage(false);
    setPlayingSound(false);
  };

  // Generate sparkles
  const sparkles = Array.from({ length: 20 }, (_, i) => (
    <div
      key={i}
      className="absolute animate-sparkle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }}
    >
      <Sparkles className="w-4 h-4 text-gold-accent" />
    </div>
  ));

  // Generate confetti
  const confetti = Array.from({ length: 50 }, (_, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 rounded-full ${showConfetti ? 'animate-confetti-fall' : 'opacity-0'}`}
      style={{
        left: `${Math.random() * 100}%`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${3 + Math.random() * 2}s`
      }}
    />
  ));

  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-deep-purple via-purple-luxury to-background">
        <div className="absolute inset-0 bg-gradient-sparkle opacity-30"></div>
        {sparkles}
      </div>

      {/* Confetti */}
      <div className="absolute inset-0 pointer-events-none">
        {confetti}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        
        {/* Envelope */}
        <div 
          className={`relative transition-all duration-1000 ${isOpened ? 'scale-110' : 'scale-100 hover:scale-105 cursor-pointer'}`}
          onClick={handleEnvelopeClick}
          style={{ perspective: '1000px' }}
        >
          {/* Floating Tag */}
          {!isOpened && (
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
              <div className="bg-gradient-luxury px-6 py-3 rounded-full shadow-glow">
                <div className="flex items-center gap-2 text-primary-foreground font-semibold">
                  <Gift className="w-5 h-5" />
                  Click to open your surprise!
                </div>
              </div>
            </div>
          )}

          {/* Envelope Body */}
          <div className="relative w-80 h-56 bg-gradient-envelope rounded-lg shadow-envelope">
            {/* Envelope Glow */}
            <div className="absolute inset-0 bg-gradient-envelope rounded-lg animate-glow-pulse"></div>
            
            {/* Envelope Flap */}
            <div 
              className={`absolute top-0 left-0 w-full h-28 bg-gradient-envelope rounded-t-lg transition-transform duration-1500 origin-top ${
                isOpened ? 'animate-envelope-open' : ''
              }`}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Wax Seal */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-rose-gold rounded-full flex items-center justify-center shadow-luxury">
                <Heart className="w-6 h-6 text-primary-foreground" />
              </div>
            </div>

            {/* Envelope Bottom */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-envelope rounded-b-lg"></div>
          </div>
        </div>

        {/* Birthday Card */}
        {showCard && (
          <div 
            className={`absolute inset-8 bg-gradient-card rounded-2xl shadow-card border border-border overflow-hidden ${
              showCard ? 'animate-card-slide' : 'opacity-0'
            }`}
            style={{ perspective: '1000px' }}
          >
            {/* Card Inner Content */}
            <div className={`h-full transition-transform duration-800 ${showCard ? 'animate-card-open' : ''}`}>
              <div className="h-full flex flex-col lg:flex-row p-8 gap-8">
                
                {/* Photos Section */}
                <div className="flex-1 flex flex-col items-center gap-6">
                  {/* Main Photo */}
                  <div className={`relative transition-all duration-800 ${showPhotos ? 'animate-photo-reveal' : 'opacity-0'}`}>
                    <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-gold-primary shadow-luxury">
                      <img 
                        src={birthdayMain} 
                        alt="Birthday Person"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-luxury rounded-full flex items-center justify-center animate-sparkle">
                      <Star className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>

                  {/* Photo Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {[birthdayFriends, birthdayCake, birthdayFamily].map((photo, index) => (
                      <div 
                        key={index}
                        className={`relative group transition-all duration-800 ${
                          showPhotos ? 'animate-photo-reveal' : 'opacity-0'
                        }`}
                        style={{ animationDelay: `${index * 200}ms` }}
                      >
                        <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-gold-secondary shadow-card group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                          <img 
                            src={photo} 
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Message Section */}
                <div className="flex-1 flex flex-col justify-center items-center text-center">
                  <div className={`space-y-6 max-w-md transition-all duration-800 ${showMessage ? 'animate-fade-in-up' : 'opacity-0'}`}>
                    <h1 className="text-4xl font-bold bg-gradient-luxury bg-clip-text text-transparent">
                      Happy Birthday
                    </h1>
                    <h2 className="text-2xl font-semibold text-gold-primary">
                      {recipientName}!
                    </h2>
                    <p className="text-lg text-foreground leading-relaxed">
                      {message}
                    </p>
                    
                    {/* Animated Hearts */}
                    <div className="flex justify-center gap-2 mt-6">
                      {[...Array(5)].map((_, i) => (
                        <Heart 
                          key={i}
                          className={`w-6 h-6 text-accent animate-sparkle fill-current`}
                          style={{ animationDelay: `${i * 0.3}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Exclusive Premium Features */}
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-luxury px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground">
                ✨ EXCLUSIVE
              </div>
            </div>
          </div>
        )}

        {/* Reset Button */}
        {isOpened && (
          <button
            onClick={handleReset}
            className="fixed bottom-8 right-8 bg-gradient-luxury px-6 py-3 rounded-full shadow-luxury hover:shadow-glow transition-all duration-300 text-primary-foreground font-semibold z-20"
          >
            🔄 Replay Surprise
          </button>
        )}
      </div>

      {/* Audio Manager */}
      <AudioManager
        soundEnabled={soundEnabled}
        musicPlaying={musicPlaying}
        customSongFile={customSongFile}
      />

      {/* Voice Greeting */}
      <VoiceGreeting
        recipientName={recipientName}
        isVisible={showMessage}
        apiKey={apiKey}
      />

      {/* Audio Element (Hidden) - Keeping for compatibility */}
      {playingSound && (
        <audio autoPlay className="hidden">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaAT2V3fPHeCAFLYPQ9NiINAcZaNrzzpZODwtEn+Txs2AcBzOV3PvDeiAFN4LM9NySNgkZYLny1KdJFAJGnOLuw2EaBX3+8+SGNwcOcdgQzJZOEAVCn+LmqWEcBXZM+vNidj0JG2fQ6t1lNgktGpV5MJL9I2hKU1Pb4qpgHAg3jdz1ynshBS2Bz/TYijQIGWi78NqXTgwHQKHg8rJhGgVG/fPjgzgHE2/Z781lNwks" type="audio/wav" />
        </audio>
      )}
    </div>
  );
};

export default BirthdayEnvelope;