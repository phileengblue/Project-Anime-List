import { createContext, useContext, useReducer, ReactNode, useEffect, useState } from 'react';
import { Anime, Action, GlobalState } from '../models/types';
import { fetchAiringAnime } from '../api/airingApi'; 
import { fetchPopularAnime } from '../api/popularApi'; 
import { fetchUpcomingAnime } from '../api/upcomingApi'; 
import { searchAnime as searchAnimeAPI } from '../api/search.Api'; 

const GlobalContext = createContext<GlobalState | undefined>(undefined);

// Funzione per salvare i preferiti nel localStorage
const saveFavoritesToLocalStorage = (favorites: Anime[]) => {
  localStorage.setItem('favorites', JSON.stringify(favorites));
};

// Reducer per gestire lo stato globale
const reducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'get_popular_anime':
      return { ...state, popularAnime: action.payload, loading: false };
    case 'search':
      return { ...state, searchResults: action.payload, loading: false };
    case 'get_upcoming_anime':
      return { ...state, upcomingAnime: action.payload, loading: false };
    case 'get_airing_anime':
      return { ...state, airingAnime: action.payload, loading: false };
    case 'add_to_favorites':
      const isDuplicate = state.favoriteAnime.some(item => item.mal_id === action.payload.mal_id);
      if (!isDuplicate) {
        const updatedFavorites = [...state.favoriteAnime, action.payload];
        saveFavoritesToLocalStorage(updatedFavorites); // Salva i preferiti nel localStorage
        return { ...state, favoriteAnime: updatedFavorites };
      }
      return state;
    case 'remove_from_favorites':
      const filteredFavorites = state.favoriteAnime.filter(anime => anime.mal_id !== action.payload);
      saveFavoritesToLocalStorage(filteredFavorites); // Salva i preferiti nel localStorage
      return { ...state, favoriteAnime: filteredFavorites };
    case 'load_favorites':
      return { ...state, favoriteAnime: action.payload };
    default:
      return state;
  }
};

// Provider per il contesto globale
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const initialState: GlobalState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    pictures: [],
    isSearch: false,
    searchResults: [],
    loading: false,
    handleChange: () => { },
    handleSubmit: () => { },
    searchAnime: () => { },
    search: '',
    getPopularAnime: async () => { },
    getUpcomingAnime: async () => { },
    getAiringAnime: async () => { },
    getAnimePictures: async () => { },
    favoriteAnime: [],
    addToFavorites: () => { },
    removeFromFavorites: () => { },
  };

  // Reducer per gestire lo stato
  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState('');

  // useEffect per caricare i preferiti memorizzati
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    console.log('Stored Favorites:', storedFavorites); // Verifica se i dati vengono caricati correttamente
    if (storedFavorites) {
      dispatch({ type: 'load_favorites', payload: JSON.parse(storedFavorites) });
    }
  }, []);

  // Effetto per salvare i preferiti aggiornati
  useEffect(() => {
    console.log('Updated Favorites:', state.favoriteAnime); // Verifica se i preferiti vengono aggiornati correttamente
    saveFavoritesToLocalStorage(state.favoriteAnime);
  }, [state.favoriteAnime]);


  // Funzione per gestire il cambiamento nell'input di ricerca
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value === '') {
      dispatch({ type: 'search', payload: [] });
    }
  };

  // Funzione per gestire l'invio del modulo di ricerca
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      dispatch({ type: 'loading' });
      // Modifica dello stato locale
      setSearch('');
      dispatch({ type: 'search', payload: [] });
      state.isSearch = true;
    } else {
      alert('Please enter a search term');
      // Modifica dello stato locale
      setSearch('');
      dispatch({ type: 'search', payload: [] });
      state.isSearch = false;
    }
  };

  // Funzione per ottenere gli anime popolari
  const getPopularAnime = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await fetchPopularAnime();
      dispatch({ type: 'get_popular_anime', payload: response });
    } catch (error) {
      console.error('Error fetching popular anime:', error);
    }
  };

  // Funzione per ottenere gli anime in arrivo
  const getUpcomingAnime = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await fetchUpcomingAnime();
      dispatch({ type: 'get_upcoming_anime', payload: response });
    } catch (error) {
      console.error('Error fetching upcoming anime:', error);
    }
  };

  // Funzione per ottenere gli anime in onda
  const getAiringAnime = async () => {
    dispatch({ type: 'loading' });
    try {
      const response = await fetchAiringAnime();
      dispatch({ type: 'get_airing_anime', payload: response });
    } catch (error) {
      console.error('Error fetching airing anime:', error);
    }
  };

  // Funzione per cercare un anime
  const searchAnime = async (anime: string) => {
    dispatch({ type: 'loading' });
    try {
      const response = await searchAnimeAPI(anime);
      dispatch({ type: 'search', payload: response });
    } catch (error) {
      console.error('Error searching anime:', error);
    }
  };

  // Funzione per aggiungere un anime ai preferiti
  const addToFavorites = (anime: Anime) => {
    dispatch({ type: 'add_to_favorites', payload: anime });
  };

  // Funzione per rimuovere un anime dai preferiti
  const removeFromFavorites = (mal_id: number) => {
    dispatch({ type: 'remove_from_favorites', payload: mal_id });
  };

  // useEffect per ottenere gli anime popolari all'avvio
  useEffect(() => {
    getPopularAnime();
    getUpcomingAnime();
    getAiringAnime();
  }, []);

  // Restituisce il provider del contesto globale con lo stato e le funzioni necessarie
  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        searchAnime,
        search,
        getPopularAnime,
        getUpcomingAnime,
        getAiringAnime,
        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook per utilizzare il contesto globale
export const useGlobalContext = (): GlobalState => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }
  return context;
};
