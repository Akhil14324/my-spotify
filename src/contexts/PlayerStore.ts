import { create } from 'zustand';
import type { Track } from '../types';

interface PlayerState {
  currentTrack: Track | null;
  queue: Track[];
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  audioRef: HTMLAudioElement | null;
  
  setAudioRef: (ref: HTMLAudioElement) => void;
  playTrack: (track: Track) => Promise<void>;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  setProgress: (progress: number) => void;
  addToQueue: (track: Track) => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 1,
  audioRef: null,

  setAudioRef: (ref) => set({ audioRef: ref }),
  
  playTrack: async (track) => {
    const { audioRef } = get();
    if (!audioRef) return;
    
    set({ currentTrack: track, isPlaying: false, progress: 0, duration: track.duration });
    
    try {
      audioRef.src = `/api/stream?videoId=${track.videoId}`;
      audioRef.play();
      set({ isPlaying: true });
    } catch (e) {
      console.error('Failed to play track', e);
    }
  },
  
  pause: () => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.pause();
      set({ isPlaying: false });
    }
  },
  
  resume: () => {
    const { audioRef } = get();
    if (audioRef && get().currentTrack) {
      audioRef.play();
      set({ isPlaying: true });
    }
  },
  
  seek: (time) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.currentTime = time;
      set({ progress: time });
    }
  },
  
  setVolume: (volume) => {
    const { audioRef } = get();
    if (audioRef) {
      audioRef.volume = volume;
    }
    set({ volume });
  },

  setProgress: (progress) => set({ progress }),

  addToQueue: (track) => set((state) => ({ queue: [...state.queue, track] })),
  
  playNext: () => {
    // Basic queue logic
    set((state) => {
      if (state.queue.length > 0) {
        const nextTrack = state.queue[0];
        const newQueue = state.queue.slice(1);
        get().playTrack(nextTrack);
        return { queue: newQueue };
      }
      return state;
    });
  },
  
  playPrevious: () => {
    // Implement previous logic or just seek to 0 for now
    get().seek(0);
  }
}));
