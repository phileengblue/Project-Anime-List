import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/useGlobal';
import './Sidebar.css';
import { Anime } from '../../models/types'

const Sidebar: React.FC = () => {
  // Utilizzo del context globale per accedere allo stato
  const { popularAnime } = useGlobalContext();

  // Ordina gli anime in base al punteggio (score) in ordine decrescente
  const sorted = popularAnime?.filter((anime) => anime.score != null).sort((a: Anime, b: Anime) => {
    return (b.score || 0) - (a.score || 0);
  });

  return (
    <div className="Sidebar">
      <h3>Top 5 Popular</h3>
      <div className="anime">
        {sorted?.slice(0, 5).map((anime: Anime) => (
          <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <h5>{anime.title}</h5>
            <p>Score: {anime.score}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
