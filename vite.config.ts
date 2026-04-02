import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import YTMusic from 'ytmusic-api';
import { spawn } from 'child_process';
import path from 'path';

const ytmusic = new YTMusic();

const apiMiddleware = () => ({
  name: 'api-middleware',
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      // Initialize ytmusic once
      if (!ytmusic.initialized) await ytmusic.initialize();

      const url = new URL(req.url || '/', `http://${req.headers.host}`);
      
      // SEARCH ENDPOINT
      if (req.method === 'GET' && url.pathname === '/api/search') {
        const query = url.searchParams.get('q');
        if (!query) {
          res.statusCode = 400;
          return res.end(JSON.stringify({ error: 'Query required' }));
        }
        try {
          const results = await ytmusic.searchSongs(query);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(results));
        } catch (e: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: e.message }));
        }
        return;
      }

      // STREAM ENDPOINT
      if (req.method === 'GET' && url.pathname === '/api/stream') {
        const videoId = url.searchParams.get('videoId');
        if (!videoId) {
           res.statusCode = 400;
           return res.end('Video ID required');
        }
        try {
          res.setHeader('Content-Type', 'audio/webm');
          res.setHeader('Transfer-Encoding', 'chunked');
          
          const ytdlpPath = path.resolve(__dirname, 'yt-dlp.exe');
          const ytProcess = spawn(ytdlpPath, [
            '-f', 'bestaudio',
            '-o', '-',
            '--quiet',
            '--no-warnings',
            `https://www.youtube.com/watch?v=${videoId}`
          ]);

          ytProcess.stdout.pipe(res);

          ytProcess.stderr.on('data', (data) => {
            console.error(`yt-dlp stderr: ${data}`);
          });

          ytProcess.on('error', (err) => {
            console.error('yt-dlp process error:', err);
            if (!res.headersSent) {
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Failed to start yt-dlp' }));
            }
          });

          ytProcess.on('close', (code) => {
            if (code !== 0) {
              console.error(`yt-dlp process exited with code ${code}`);
            }
          });
        } catch (e: any) {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.end(JSON.stringify({ error: e.message }));
          }
        }
        return;
      }

      next();
    });
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), apiMiddleware()],
});
