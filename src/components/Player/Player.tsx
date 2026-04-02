import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../../contexts/PlayerStore';

export const Player: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { 
    currentTrack, 
    isPlaying, 
    progress, 
    duration, 
    volume,
    setAudioRef,
    pause,
    resume,
    seek,
    setVolume,
    setProgress,
    playNext,
    playPrevious
  } = usePlayerStore();

  useEffect(() => {
    if (audioRef.current) {
      setAudioRef(audioRef.current);
    }
  }, [setAudioRef]);

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return '0:00';
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <>
      <audio 
        ref={audioRef}
        onTimeUpdate={() => {
          if (audioRef.current) setProgress(audioRef.current.currentTime);
        }}
        onEnded={playNext}
      />
      
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 h-24 glass-panel border-t border-white/10 flex items-center justify-between px-6 z-50">
          {/* Track Info */}
          <div className="flex items-center w-1/3">
            {currentTrack.thumbnails?.[0] && (
              <img 
                src={currentTrack.thumbnails[0].url} 
                alt={currentTrack.name} 
                className="h-14 w-14 rounded-md object-cover mr-4"
              />
            )}
            <div className="flex flex-col">
              <span className="text-white text-sm font-semibold truncate hover:underline cursor-pointer">
                {currentTrack.name}
              </span>
              <span className="text-[#b3b3b3] text-xs truncate hover:underline cursor-pointer">
                {currentTrack.artist}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col items-center w-1/3">
            <div className="flex items-center space-x-6 mb-2">
              <button onClick={playPrevious} className="text-[#b3b3b3] hover:text-white transition">
                <SkipBack size={20} fill="currentColor" />
              </button>
              
              <button 
                onClick={isPlaying ? pause : resume} 
                className="bg-white text-black rounded-full p-2 hover:scale-105 transition transform"
              >
                {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
              </button>
              
              <button onClick={playNext} className="text-[#b3b3b3] hover:text-white transition">
                <SkipForward size={20} fill="currentColor" />
              </button>
            </div>
            
            <div className="flex items-center w-full max-w-md space-x-3">
              <span className="text-xs text-[#b3b3b3] min-w-[40px] text-right">
                {formatTime(progress)}
              </span>
              <input 
                type="range"
                min={0}
                max={duration || 100}
                value={progress || 0}
                onChange={handleProgressChange}
                className="w-full"
              />
              <span className="text-xs text-[#b3b3b3] min-w-[40px]">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="flex items-center justify-end w-1/3 space-x-4">
            <Volume2 size={20} className="text-[#b3b3b3]" />
            <input 
              type="range" 
              min={0} 
              max={1} 
              step={0.01}
              value={volume}
              onChange={handleVolumeChange}
              className="w-24"
            />
          </div>
        </div>
      )}
    </>
  );
};
