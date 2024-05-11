// Interfaccia per la struttura di un anime
export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score?: number; 
}

// Interfaccia per la struttura di un'immagine
export interface Picture {
  jpg: {
    image_url: string;
  };
}

// Tipi delle azioni per il reducer
export type Action =
  | { type: 'loading' }
  | { type: 'get_popular_anime'; payload: Anime[] }
  | { type: 'search'; payload: Anime[] }
  | { type: 'get_upcoming_anime'; payload: Anime[] }
  | { type: 'get_airing_anime'; payload: Anime[] }
  | { type: 'add_to_favorites'; payload: Anime }
  | { type: 'remove_from_favorites'; payload: number }
  | { type: 'load_favorites'; payload: Anime[] };


// Interfaccia per rappresentare un anime
export interface Anime2 {
  mal_id: number;
  title: string;
  synopsis: string;
  trailer: {
    embed_url: string;
  } | null;
  duration: string;
  aired: {
    string: string;
  } | null;
  season: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  } | null;
  rank: number | null;
  score: number | null;
  scored_by: number | null;
  popularity: number | null;
  status: string | null;
  rating: string | null;
  source: string | null;
}

// Interfaccia per rappresentare un personaggio dell'anime
export interface Character {
  role: string;
  character: {
    [x: string]: any;
    images: {
      jpg: {
        image_url: string;
      };
      name: string;
      mal_id: number;
    };
  };
}

// Definizione dello stato globale
export interface GlobalState {
  popularAnime: Anime[];
  upcomingAnime: Anime[];
  airingAnime: Anime[];
  pictures: Picture[];
  isSearch: boolean;
  searchResults: Anime[];
  loading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  searchAnime: (anime: string) => void; 
  search: string; 
  getPopularAnime: () => Promise<void>; 
  getUpcomingAnime: () => Promise<void>; 
  getAiringAnime: () => Promise<void>; 
  getAnimePictures: (id: number) => Promise<void>; 
  favoriteAnime: Anime[]; 
  addToFavorites: (anime: Anime) => void;
  removeFromFavorites: (mal_id: number) => void;
}