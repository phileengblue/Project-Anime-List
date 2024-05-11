import React from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/useGlobal';
import Sidebar from '../Sidebar/Sidebar';
import './Upcoming.css';
import axios from 'axios';
import { Anime } from '../../models/types'


// Definizione del tipo per le props del componente Upcoming
interface Props {
  rendered: string;
}

const Upcoming: React.FC<Props> = ({ rendered }) => {
  // Utilizzo del context globale per accedere allo stato
  const { isSearch, searchResults, addToFavorites } = useGlobalContext();

  // Utilizzo dello stato locale per memorizzare la lista degli anime in arrivo
  const [upcomingAnime, setUpcomingAnime] = React.useState<Anime[]>([]);

  React.useEffect(() => {
    // Funzione per recuperare la lista degli anime in arrivo dall'API
    const fetchUpcomingAnime = async () => {
      try {
        const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=upcoming');
        setUpcomingAnime(response.data.data);
      } catch (error) {
        console.error('Error fetching upcoming anime:', error);
      }
    };

    // Richiama la funzione per recuperare la lista degli anime in arrivo quando il componente viene montato
    fetchUpcomingAnime();
  }, []); // Array vuoto come dipendenza per assicurare che questa chiamata venga eseguita solo una volta

  // Funzione per il rendering condizionale degli anime in arrivo
  const conditionalRender = () => {
    if (!isSearch && rendered === 'upcoming') {
      return upcomingAnime?.map((anime: Anime, index: number) => (
        <div key={index} className="card">
          <Link to={`/anime/${anime.mal_id}`}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <h3>{anime.title}</h3>
          </Link>
          <button onClick={() => addToFavorites(anime)}>Aggiungi ai preferiti</button>
        </div>
      ));
    } else {
      return searchResults?.map((anime: Anime) => (
        <div key={anime.mal_id} className="card">
          <Link to={`/anime/${anime.mal_id}`}>
            <img src={anime.images.jpg.large_image_url} alt="" />
            <h3>{anime.title}</h3>
          </Link>
          <button onClick={() => addToFavorites(anime)}>Aggiungi ai preferiti</button>
        </div>
      ));
    }
  };

  return (
    <div className="upcoming-container">
      <div className="upcoming-anime">{conditionalRender()}</div>
      <Sidebar />
    </div>
  );
};

export default Upcoming;
