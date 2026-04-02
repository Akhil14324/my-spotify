import React, { useState, useEffect } from 'react';
import { Search as SearchIcon, Play } from 'lucide-react';
import { usePlayerStore } from '../contexts/PlayerStore';
import { searchSongs } from '../api';
import type { SearchResult } from '../types';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const playTrack = usePlayerStore((state) => state.playTrack);

  const mapToTrack = (result: SearchResult) => ({
    videoId: result.videoId,
    name: result.name,
    artist: result.artist?.name || result.artists?.[0]?.name || 'Unknown',
    duration: result.duration || 0,
    thumbnails: result.thumbnails
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        setLoading(true);
        searchSongs(query)
          .then(res => {
            setResults(res.filter(r => r.type === 'SONG' || r.type === 'VIDEO'));
            setLoading(false);
          })
          .catch(() => setLoading(false));
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-white relative">
      <div className="sticky top-0 z-20 py-4 bg-[var(--color-background)]">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            className="w-full bg-white text-black rounded-full py-3 px-12 font-medium focus:outline-none focus:ring-2 focus:ring-white border-none"
            placeholder="What do you want to listen to?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-4 top-3.5 text-black" size={24} />
        </div>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : results.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold mb-4">Songs</h2>
            <div className="flex flex-col space-y-1">
              {results.map((song, index) => (
                <div 
                  key={song.videoId} 
                  className="flex items-center p-2 hover:bg-[#2a2a2a] rounded-md group cursor-pointer transition select-none"
                  onDoubleClick={() => playTrack(mapToTrack(song))}
                >
                  <div className="w-8 text-center text-[#b3b3b3] group-hover:hidden hidden sm:block">
                    {index + 1}
                  </div>
                  <div className="w-8 text-center hidden group-hover:block hidden sm:block">
                    <button onClick={() => playTrack(mapToTrack(song))}>
                      <Play size={16} fill="white" className="text-white" />
                    </button>
                  </div>
                  
                  {song.thumbnails?.[0] && (
                    <img 
                      src={song.thumbnails[0].url} 
                      alt={song.name} 
                      className="w-10 h-10 object-cover ml-2 sm:ml-0"
                    />
                  )}
                  
                  <div className="flex-1 ml-4 overflow-hidden">
                    <div className="text-white truncate lg:w-96 text-base font-normal">
                      {song.name}
                    </div>
                    <div className="text-[#b3b3b3] text-sm truncate">
                      {song.artist?.name || song.artists?.[0]?.name || 'Unknown Artist'}
                    </div>
                  </div>
                  
                  <div className="hidden md:block w-1/4 text-[#b3b3b3] text-sm truncate">
                    {song.album?.name || '-'}
                  </div>
                  
                  <div className="w-16 text-[#b3b3b3] text-sm text-right pr-4">
                    {formatDuration(song.duration)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : query ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold mb-2">No results found for "{query}"</h2>
            <p className="text-[#b3b3b3]">Please make sure your words are spelled correctly, or use less or different keywords.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Some placeholder categories could go here */}
            {['Pop', 'Hip-Hop', 'Rock', 'Latin', 'Electronic', 'Jazz', 'Chill', 'Gaming'].map(genre => (
              <div key={genre} className="bg-gradient-to-br from-purple-600 to-blue-500 h-48 rounded-lg p-4 font-bold text-xl cursor-pointer hover:scale-105 transition transform shadow-lg relative overflow-hidden">
                {genre}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
