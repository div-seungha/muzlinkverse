interface SpotifyAlbum {
  album_type: string;
  artists: Array<SpotifyArtist>;
  available_market: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    width: number;
    height: number;
    url: string;
  }>;
  is_playable: boolean;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

interface SpotifyArtist {
  external_urls: any[];
  href: string;
  id: string;
  name: string;
  uri: string;
}

interface SpotifyExternalId {}

interface SpotifyExternalUrl {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

interface Spotify {
  album: Array<SpotifyAlbum>;
  artists: Array<SpotifyArtist>;
  available_markets: any[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Array<SpotifyExternalId>;
  external_urls: Array<SpotifyExternalUrl>;
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: string;
  uri: string;
}

interface Apple {
  href: string;
  data: Array<AppleData>;
}

interface AppleData {
  id: string;
  type: string;
  href: string;
  attributes: {
    albumName: string;
    genreNames: Array<string>;
    trackNumber: number;
    durationInMillis: number;
    releaseDate: string;
    isrc: string;
    artwork: {
      width: number;
      height: number;
      url: string;
      bgColor: string;
      textColor1: string;
      textColor2: string;
      textColor3: string;
      textColor4: string;
    };
    composerName: string;
    url: string;
    playParams: Array<{
      id: string;
      kind: string;
    }>;
    discNumber: number;
    hasLyrics: boolean;
    isAppleDigitalMaster: boolean;
    name: string;
    previews: Array<{
      url: string;
    }>;
    artistName: string;
  };
}

interface SearchResult {
  spotify: Spotify;
  apple: Apple;
}

interface SearchResultPage {
  id: number;
  createdAt: string;
  title: string;
  artist: string;
  rawArtwork: string;
  bgColor: string;
  releaseDate: string;
  spotifyUrl: string;
  youtubeUrl: string;
  appleMusicUrl: string;
  melonUrl: string;
}
