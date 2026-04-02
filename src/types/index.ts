export interface Track {
  videoId: string;
  name: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  thumbnails: { url: string; width: number; height: number }[];
}

export interface SearchResult {
  type: string;
  videoId: string;
  name: string;
  artist: { name: string; artistId: string };
  artists?: { name: string; artistId: string }[];
  album?: { name: string; albumId: string };
  duration: number;
  thumbnails: { url: string; width: number; height: number }[];
}
