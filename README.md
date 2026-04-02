
# 🎧 My Spotify Clone

A modern Spotify-inspired music streaming web app built using React, TypeScript, and Vite. This project allows users to search, stream, and play music locally using YouTube as a source via `yt-dlp`.

---

## 🚀 Features

- 🔍 Search for songs
- ▶️ Stream music directly in the browser
- 🎵 Custom music player with controls
- 📂 Sidebar navigation (Home, Search)
- ⚡ Fast and optimized UI using Vite
- 🎯 State management using Context API

---

## 🛠️ Tech Stack

- **Frontend:** React + TypeScript  
- **Build Tool:** Vite  
- **Styling:** CSS  
- **State Management:** React Context API  
- **Media Source:** YouTube (via `yt-dlp`)  

---

## 📁 Project Structure

```
my-spotify-main/
│── public/               # Static assets
│── src/
│   ├── api/              # API handling
│   ├── components/       # UI components (Player, Sidebar)
│   ├── contexts/         # Global state (PlayerStore)
│   ├── pages/            # Pages (Home, Search)
│   ├── assets/           # Images and icons
│   ├── types/            # Type definitions
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
│── index.html
│── package.json
│── vite.config.ts
│── yt-dlp.exe            # Used for fetching audio streams
```

---

## ⚙️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/my-spotify.git
cd my-spotify
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open in browser:
```
http://localhost:5173
```

---

## ⚠️ Important Notes

- This project uses `yt-dlp` to fetch audio streams from YouTube.
- Ensure `yt-dlp.exe` is present in the root directory.
- Streaming depends on external sources, so performance may vary.

---

## 📌 Future Improvements

- 🔐 User authentication  
- ❤️ Playlist & favorites system  
- 📱 Mobile responsiveness improvements  
- ☁️ Backend integration  
- 🎶 Recommendation system  

---

## 🤝 Contributing

Contributions are welcome. Fork the repo and submit a pull request.

---

## 📄 License

This project is for educational purposes only.

---

## 👨‍💻 Author

**Akhil**  
CSE (AI) Student | Web Developer | ML Enthusiast
