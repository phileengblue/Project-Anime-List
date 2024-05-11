import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../hooks/useGlobal';
import Popular from '../Popular/Popular';
import Upcoming from '../Upcoming/Upcoming';
import Airing from '../Airing/Airing';
import './Homepage.css';

function Homepage() {
  // Hook di navigazione
  const navigate = useNavigate();
  // Hook per accedere allo stato globale
  const { handleSubmit, search, handleChange, getUpcomingAnime, getAiringAnime, getPopularAnime } = useGlobalContext();

  // Stato per il tipo di componente da visualizzare
  const [rendered, setRendered] = useState<string>('popular');

  // Funzione per cambiare il componente visualizzato in base alla selezione
  const switchComponent = () => {
    switch (rendered) {
      case 'popular':
        return <Popular rendered={rendered} />;
      case 'airing':
        return <Airing rendered={rendered} />;
      case 'upcoming':
        return <Upcoming rendered={rendered} />;
      default:
        return <Popular rendered={rendered} />;
    }
  };

  // Gestore per il click sui pulsanti di filtro
  const handleButtonClick = async (filter: string) => {
    setRendered(filter);
    switch (filter) {
      case 'popular':
        await getPopularAnime();
        break;
      case 'airing':
        await getAiringAnime();
        break;
      case 'upcoming':
        await getUpcomingAnime();
        break;
      default:
        break;
    }
  };

  // Gestore per generare un ID casuale e navigare alla pagina corrispondente
  const handleGenerate = async () => {
    const randomId = Math.floor(Math.random() * 20000) + 1;
    navigate(`/anime/${randomId}`);
  };

  // Gestore per navigare alla pagina dei preferiti
  const handleFavoritesList = () => {
    navigate('/favorites');
  };

  return (
    <div className="homepage">
      <header>
        <div className="logo">
          <h1>{rendered === 'popular' ? 'Popular Anime' : rendered === 'airing' ? 'Airing Anime' : 'Upcoming Anime'}</h1>
        </div>
        <div className="search-container">
          <div className="filter-btn popular-filter">
            <button onClick={() => handleButtonClick('popular')}>Popular<i className="fas fa-fire"></i></button>
          </div>
          <form action="" className="search-form" onSubmit={handleSubmit}>
            <div className="input-control">
              <input type="text" placeholder="Search Anime" value={search} onChange={handleChange} />
              <button type="submit">Search</button>
            </div>
          </form>
          <div className="filter-btn airing-filter">
            <button onClick={() => handleButtonClick('airing')}>Airing</button>
          </div>
          <div className="filter-btn upcoming-filter">
            <button onClick={() => handleButtonClick('upcoming')}>Upcoming</button>
          </div>
          <div className="filter-btn generate-filter">
            <button onClick={handleGenerate}>Genera</button>
          </div>
          <div className="filter-btn favorites-filter">
            <button onClick={handleFavoritesList}>Lista preferiti</button>
          </div>
        </div>
      </header>
      {switchComponent()}
    </div>
  );
}

export default Homepage;
