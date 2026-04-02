
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Player } from './components/Player/Player';
import { Home } from './pages/Home';
import { Search } from './pages/Search';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-[var(--color-background)]">
        <Sidebar />
        
        <div className="flex-1 overflow-y-auto relative pb-24">
          {/* Main content area */}
          <div className="bg-gradient-to-b from-[#2a2a2a] to-[var(--color-background)] h-64 absolute top-0 w-full z-0 pointer-events-none" />
          
          <div className="relative z-10 px-8 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/library" element={<div className="text-white">Library feature coming soon!</div>} />
            </Routes>
          </div>
        </div>

        <Player />
      </div>
    </BrowserRouter>
  );
}

export default App;
