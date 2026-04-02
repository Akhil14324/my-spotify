import type { SearchResult } from '../types';

export async function searchSongs(query: string): Promise<SearchResult[]> {
  const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Search failed');
  return res.json();
}

export async function getStreamUrl(videoId: string): Promise<{ url: string; bitrate: number }> {
  const res = await fetch(`/api/stream?videoId=${encodeURIComponent(videoId)}`);
  if (!res.ok) throw new Error('Stream fetch failed');
  return res.json();
}
