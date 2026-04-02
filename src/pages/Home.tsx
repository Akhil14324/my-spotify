import React, { useEffect, useState } from 'react';
import { Play } from 'lucide-react';
import { searchSongs } from '../api';
import type { SearchResult } from '../types';
import { usePlayerStore } from '../contexts/PlayerStore';

export const Home: React.FC = () => {
  const [recent, setRecent] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const playTrack = usePlayerStore((state) => state.playTrack);

  useEffect(() => {
    searchSongs('top hits')
      .then((res) => {
        setRecent(res.filter(r => r.type === 'SONG').slice(0, 10));
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const mapToTrack = (result: SearchResult) => ({
    videoId: result.videoId,
    name: result.name,
    artist: result.artist?.name || result.artists?.[0]?.name || 'Unknown',
    duration: result.duration || 0,
    thumbnails: result.thumbnails
  });

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Recommended for you</h2>
        {loading ? (
          <div className="flex space-x-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-40 h-56 bg-[#181818] rounded-md animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {recent.map((song) => (
              <div 
                key={song.videoId} 
                className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition group cursor-pointer relative"
                onClick={() => playTrack(mapToTrack(song))}
              >
                <div className="relative mb-4 pb-[100%] rounded-md overflow-hidden bg-[#333]">
                  {song.thumbnails?.[0] && (
                    <img 
                      src={song.thumbnails[song.thumbnails.length - 1].url} 
                      alt={song.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                  <button 
                    className="absolute bottom-2 right-2 bg-green-500 rounded-full p-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-lg hover:scale-105 hover:bg-green-400"
                    onClick={(e) => {
                      e.stopPropagation();
                      playTrack(mapToTrack(song));
                    }}
                  >
                    <Play size={24} fill="black" className="text-black ml-1" />
                  </button>
                </div>
                <h3 className="font-semibold text-white truncate">{song.name}</h3>
                <p className="text-sm text-[#b3b3b3] mt-1 truncate">
                  {song.artist?.name || song.artists?.[0]?.name || 'Unknown Artist'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
