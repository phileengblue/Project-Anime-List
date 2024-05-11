import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/useGlobal'; 
import Sidebar from '../Sidebar/Sidebar';
import './Airing.css';
import { Anime } from '../../models/types';

interface Props {
  rendered: string; // Interfaccia delle Props accetta una stringa chiamata `rendered`
}

const Airing: React.FC<Props> = ({ rendered }) => {
  // Utilizzo del contesto globale per ottenere i dati degli anime in onda e altre informazioni
  const { airingAnime, isSearch, searchResults, addToFavorites } = useGlobalContext();

  // Funzione per renderizzare condizionalmente gli elementi
  const conditionalRender = () => {
    let currentItems: Anime[] | null = null;

    // Se non è attiva una ricerca e il componente Airing è visualizzato, mostra gli anime in onda
    if (!isSearch && rendered === 'airing') {
      currentItems = airingAnime;
    } else {
      // Altrimenti, mostra i risultati della ricerca
      currentItems = searchResults;
    }

    // Se non ci sono elementi da visualizzare, restituisce null
    if (!currentItems) return null;

    // Restituisce gli elementi da visualizzare, ognuno con un link all'anime e un pulsante per aggiungere ai preferiti
    return currentItems.map((anime: Anime) => (
      <div key={anime.mal_id} className="card">
        <Link to={`/anime/${anime.mal_id}`}>
          <img src={anime.images.jpg.large_image_url} alt="" /> {/* Link all'anime */}
          <h3>{anime.title}</h3>
        </Link>
        <button onClick={() => addToFavorites(anime)}>Aggiungi ai preferiti</button> {/* Pulsante per aggiungere ai preferiti */}
      </div>
    ));
  };

  // Restituisce il componente Airing con gli elementi condizionalmente renderizzati e la barra laterale
  return (
    <div className="airing-container">
      <div className="airing-anime">{conditionalRender()}</div> {/* Renderizza gli anime o i risultati della ricerca */}
      <Sidebar /> {/* Barra laterale */}
    </div>
  );
};

export default Airing;
