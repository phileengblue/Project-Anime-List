// Interfaccia per la struttura di un anime
export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  score?: number; // Score è un campo opzionale
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
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Funzione per gestire il cambiamento nell'input
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void; // Funzione per gestire l'invio del modulo
  searchAnime: (anime: string) => void; // Funzione per cercare un anime
  search: string; // Stringa di ricerca
  getPopularAnime: () => Promise<void>; // Funzione per ottenere gli anime popolari
  getUpcomingAnime: () => Promise<void>; // Funzione per ottenere gli anime in arrivo
  getAiringAnime: () => Promise<void>; // Funzione per ottenere gli anime in onda
  getAnimePictures: (id: number) => Promise<void>; // Funzione per ottenere le immagini di un anime
  favoriteAnime: Anime[]; // Array degli anime preferiti
  addToFavorites: (anime: Anime) => void; // Funzione per aggiungere un anime ai preferiti
  removeFromFavorites: (mal_id: number) => void; // Funzione per rimuovere un anime dai preferiti
}