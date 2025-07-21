import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Palette, Download, Share2, Camera, Music, Settings, X, Key, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ExclusiveFeaturesProps {
  isVisible: boolean;
  onSoundToggle: (enabled: boolean) => void;
  onMusicToggle: (playing: boolean) => void;
  onApiKeyChange: (key: string) => void;
  onCustomSongUpload: (file: File | null) => void;
  soundEnabled: boolean;
  musicPlaying: boolean;
  customSongFile?: File | null;
}

const ExclusiveFeatures: React.FC<ExclusiveFeaturesProps> = ({ 
  isVisible, 
  onSoundToggle, 
  onMusicToggle, 
  onApiKeyChange,
  onCustomSongUpload,
  soundEnabled,
  musicPlaying,
  customSongFile
}) => {
  const [currentTheme, setCurrentTheme] = useState('luxury');
  const [panelOpen, setPanelOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const themes = [
    { name: 'luxury', label: 'Gold Luxury', colors: 'from-yellow-400 to-orange-500' },
    { name: 'romantic', label: 'Rose Romance', colors: 'from-pink-400 to-red-500' },
    { name: 'royal', label: 'Royal Purple', colors: 'from-purple-400 to-indigo-500' },
    { name: 'ocean', label: 'Ocean Blue', colors: 'from-blue-400 to-cyan-500' },
    { name: 'nature', label: 'Forest Green', colors: 'from-green-400 to-emerald-500' }
  ];

  const exclusiveFeatures = [
    {
      icon: Camera,
      title: 'Photo Booth Mode',
      description: 'Interactive photo memories with zoom & effects'
    },
    {
      icon: Music,
      title: 'Custom Soundtrack',
      description: 'Happy Birthday music & sound effects'
    },
    {
      icon: Palette,
      title: 'Theme Customization',
      description: 'Multiple luxury themes to match personality'
    },
    {
      icon: Download,
      title: 'Save & Share',
      description: 'Download as video or share the experience'
    },
    {
      icon: Key,
      title: 'Voice Greeting',
      description: 'AI-powered personalized birthday message'
    }
  ];

  const handleDownload = () => {
    // In a real app, this would generate and download a video/image
    const link = document.createElement('a');
    link.href = '#';
    link.download = 'birthday-surprise.mp4';
    link.click();
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Exclusive Birthday Surprise',
          text: 'Check out this amazing birthday surprise!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to copy link
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleCustomSongUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type.startsWith('audio/')) {
        onCustomSongUpload(file);
      } else {
        alert('Please select a valid audio file (MP3, WAV, etc.)');
      }
    }
  };

  const handleRemoveCustomSong = () => {
    onCustomSongUpload(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Floating Control Button */}
      <button
        onClick={() => setPanelOpen(!panelOpen)}
        className="fixed top-6 right-6 z-40 bg-gradient-luxury rounded-full p-3 shadow-glow hover:scale-110 transition-all duration-300"
      >
        <Settings className="w-5 h-5 text-primary-foreground" />
      </button>

      {/* Sliding Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-card/95 backdrop-blur-xl border-l border-border shadow-2xl z-30 transform transition-transform duration-500 ${
        panelOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        
        {/* Panel Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gradient-luxury rounded-full animate-pulse"></div>
            <h3 className="text-lg font-semibold text-foreground">Exclusive Features</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setPanelOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Panel Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-20">
          
          {/* Features List */}
          <div className="space-y-3">
            {exclusiveFeatures.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <feature.icon className="w-5 h-5 text-gold-primary flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-foreground">{feature.title}</div>
                  <div className="text-xs text-muted-foreground">{feature.description}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Controls */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Quick Controls</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant={soundEnabled ? "luxury" : "outline"}
                size="sm"
                onClick={() => onSoundToggle(!soundEnabled)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="text-xs">Sound</span>
              </Button>
              
              <Button
                variant={musicPlaying ? "luxury" : "outline"}
                size="sm"
                onClick={() => onMusicToggle(!musicPlaying)}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Music className={`w-4 h-4 ${musicPlaying ? 'animate-pulse' : ''}`} />
                <span className="text-xs">Music</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs">Save</span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex flex-col gap-1 h-auto py-3"
              >
                <Share2 className="w-4 h-4" />
                <span className="text-xs">Share</span>
              </Button>
            </div>
          </div>

          {/* API Key Input */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">ElevenLabs Voice (Optional)</h4>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Enter ElevenLabs API key for voice greeting"
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  onApiKeyChange(e.target.value);
                }}
                className="text-sm"
              />
              <p className="text-xs text-muted-foreground">
                Add your ElevenLabs API key to enable AI voice birthday greetings
              </p>
            </div>
          </div>

          {/* Custom Song Upload */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Custom Birthday Song</h4>
            <div className="space-y-3">
              {customSongFile ? (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30 border border-gold-primary/30">
                  <Music className="w-4 h-4 text-gold-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {customSongFile.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(customSongFile.size / 1024 / 1024).toFixed(1)} MB
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveCustomSong}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleCustomSongUpload}
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    Upload Your Song
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Upload MP3, WAV, or other audio files for a personalized experience
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Theme Selector */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground">Luxury Themes</h4>
            <div className="grid grid-cols-3 gap-3">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setCurrentTheme(theme.name)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-lg border transition-all ${
                    currentTheme === theme.name 
                      ? 'border-gold-primary bg-secondary/50' 
                      : 'border-border hover:border-gold-primary/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${theme.colors}`} />
                  <span className="text-xs text-muted-foreground">{theme.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {panelOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"
          onClick={() => setPanelOpen(false)}
        />
      )}
    </>
  );
};

export default ExclusiveFeatures;