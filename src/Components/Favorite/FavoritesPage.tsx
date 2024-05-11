import React from 'react';
import { useGlobalContext } from '../../hooks/useGlobal';
import './FavoritesPage.css'; 

const FavoritesPage = () => {
  const { favoriteAnime, removeFromFavorites } = useGlobalContext(); // Utilizzo del contesto globale per ottenere la lista dei preferiti e la funzione per rimuovere dai preferiti

  // Gestisce la rimozione di un anime dalla lista dei preferiti
  const handleRemoveFromFavorites = (malId: number) => {
    removeFromFavorites(malId); // Chiama la funzione per rimuovere l'anime dai preferiti
  };

  return (
    <div className="favorites-page">
      <h2>Lista dei Preferiti</h2>
      <div className="favorites-list">
        {favoriteAnime.length > 0 ? (
          favoriteAnime.map(anime => (
            <div key={anime.mal_id} className="favorite-item">
              <a href={`/anime/${anime.mal_id}`}>
                <img src={anime.images.jpg.large_image_url} alt={anime.title} />
                <h3>{anime.title}</h3>
              </a>
              <button onClick={() => handleRemoveFromFavorites(anime.mal_id)}>Rimuovi</button>
            </div>
          ))
        ) : (
          <p>La tua lista dei preferiti è vuota</p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
