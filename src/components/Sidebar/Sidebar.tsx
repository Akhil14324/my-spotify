import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-black h-full flex flex-col pt-6 px-4">
      <div className="text-white text-2xl font-bold mb-8 px-2 tracking-tight">
        My Spotify
      </div>
      
      <div className="flex flex-col space-y-4 mb-8">
        <a href="/" className="flex items-center text-[#b3b3b3] hover:text-white transition px-2 font-semibold">
          <Home className="mr-4" size={24} />
          Home
        </a>
        <a href="/search" className="flex items-center text-[#b3b3b3] hover:text-white transition px-2 font-semibold">
          <Search className="mr-4" size={24} />
          Search
        </a>
        <a href="/library" className="flex items-center text-[#b3b3b3] hover:text-white transition px-2 font-semibold">
          <Library className="mr-4" size={24} />
          Your Library
        </a>
      </div>

      <div className="flex flex-col space-y-4 border-b border-white/10 pb-6 mb-4">
        <button className="flex items-center text-[#b3b3b3] hover:text-white transition px-2 font-semibold">
          <PlusSquare className="mr-4" size={24} />
          Create Playlist
        </button>
        <button className="flex items-center text-[#b3b3b3] hover:text-white transition px-2 font-semibold">
          <div className="bg-gradient-to-br from-indigo-500 to-blue-300 w-6 h-6 rounded-sm flex items-center justify-center mr-4">
            <Heart size={14} fill="white" className="text-white" />
          </div>
          Liked Songs
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {/* Playlists or other content would go here */}
      </div>
    </div>
  );
};
