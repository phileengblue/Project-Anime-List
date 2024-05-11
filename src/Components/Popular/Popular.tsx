import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/useGlobal';
import Sidebar from '../Sidebar/Sidebar';
import './Popular.css';
import { Anime } from '../../models/types'


// Props del componente Popular
type Props = {
  rendered: string;
};

const Popular: React.FC<Props> = ({ rendered }) => {
  // Utilizzo del context globale per accedere allo stato e alle funzioni necessarie
  const { popularAnime, isSearch, searchResults, addToFavorites } = useGlobalContext();

  // Funzione per renderizzare condizionalmente gli elementi
  const conditionalRender = () => {
    // Variabile per memorizzare gli elementi da visualizzare
    let currentItems: Anime[] | null = null;

    // Verifica se è attiva una ricerca e se il componente è "popular"
    if (!isSearch && rendered === 'popular') {
      currentItems = popularAnime;
    } else {
      currentItems = searchResults;
    }

    // Se non ci sono elementi da visualizzare, restituisce null
    if (!currentItems) return null;

    // Mappa gli elementi da visualizzare e li renderizza
    return currentItems.map((anime: Anime) => (
      <div key={anime.mal_id} className="card">
        <Link to={`/anime/${anime.mal_id}`}>
          <img src={anime.images.jpg.large_image_url} alt="" />
        </Link>
        <h3>{anime.title}</h3>
        <button onClick={() => addToFavorites(anime)}>Aggiungi ai preferiti</button>
      </div>
    ));
  };

  return (
    <div className="popular-container">
      <div className="popular-anime">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
};

export default Popular;
