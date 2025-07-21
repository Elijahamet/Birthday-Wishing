import React, { useState } from 'react';
import BirthdayEnvelope from '@/components/BirthdayEnvelope';
import ExclusiveFeatures from '@/components/ExclusiveFeatures';

const Index = () => {
  const [featuresVisible, setFeaturesVisible] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [customSongFile, setCustomSongFile] = useState<File | null>(null);

  // Show features after a delay to create exclusivity
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setFeaturesVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <BirthdayEnvelope 
        recipientName="MOM"
        message="Happy Birthday! Mom 🎉 This exclusive surprise was created just for you. Wishing you endless joy, unforgettable moments, and all the happiness your heart can hold. You are truly special and deserve to be celebrated today and always! 💖✨"
        soundEnabled={soundEnabled}
        musicPlaying={musicPlaying}
        customSongFile={customSongFile}
        apiKey={apiKey}
      />
      <ExclusiveFeatures 
        isVisible={featuresVisible}
        onSoundToggle={setSoundEnabled}
        onMusicToggle={setMusicPlaying}
        onApiKeyChange={setApiKey}
        onCustomSongUpload={setCustomSongFile}
        soundEnabled={soundEnabled}
        musicPlaying={musicPlaying}
        customSongFile={customSongFile}
      />
    </div>
  );
};

export default Index;
