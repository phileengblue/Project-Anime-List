import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './AnimeItem.css';
import axios from 'axios';
import { Anime2,Character  } from '../../models/types'; 

const AnimeItem: React.FC = () => {
  // Ottiene l'ID dell'anime dalla URL
  const { id } = useParams<{ id: string }>();

  // Stati per memorizzare i dati dell'anime e dei personaggi
  const [anime, setAnime] = useState<Anime2 | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [showMore, setShowMore] = useState<boolean>(false);

  // useEffect per caricare i dati dell'anime e dei personaggi quando l'ID cambia
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ottiene i dati dell'anime dalla API
        const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        const animeData = animeResponse.data;
        if (animeData.data !== null) {
          setAnime(animeData.data);
        }

        // Ottiene i dati dei personaggi dell'anime dalla API
        const charactersResponse = await axios.get(`https://api.jikan.moe/v4/anime/${id}/characters`);
        const charactersData = charactersResponse.data;
        if (charactersData.data !== null) {
          setCharacters(charactersData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="AnimeItem">
      {anime && (
        <>
          <h1>{anime.title}</h1>
          <div className="details">
            <div className="detail">
              <div className="image">
                <img src={anime.images?.jpg.large_image_url} alt="" />
              </div>
              <div className="anime-details">
                <p>
                  <span>Aired:</span>
                  <span>{anime.aired?.string}</span>
                </p>
                <p>
                  <span>Rating:</span>
                  <span>{anime.rating}</span>
                </p>
                <p>
                  <span>Rank:</span>
                  <span>{anime.rank}</span>
                </p>
                <p>
                  <span>Score:</span>
                  <span>{anime.score}</span>
                </p>
                <p>
                  <span>Scored By:</span>
                  <span>{anime.scored_by}</span>
                </p>
                <p>
                  <span>Popularity:</span>
                  <span>{anime.popularity}</span>
                </p>
                <p>
                  <span>Status:</span>
                  <span>{anime.status}</span>
                </p>
                <p>
                  <span>Source:</span>
                  <span>{anime.source}</span>
                </p>
                <p>
                  <span>Season:</span>
                  <span>{anime.season}</span>
                </p>
                <p>
                  <span>Duration:</span>
                  <span>{anime.duration}</span>
                </p>
              </div>
            </div>
            <p className="description">
              {showMore ? anime.synopsis : anime.synopsis?.substring(0, 450) + '...'}
              <button onClick={() => setShowMore(!showMore)}>{showMore ? 'Show Less' : 'Read More'}</button>
            </p>
          </div>
          <h3 className="title">Trailer</h3>
          <div className="trailer-con">
            {anime.trailer?.embed_url ? (
              <iframe
                src={anime.trailer.embed_url}
                title="Inline Frame Example"
                width="800"
                height="450"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <h3>Trailer not available</h3>
            )}
          </div>
          <h3 className="title">Characters</h3>
          <div className="characters">
            {characters.map((character, index) => (
              <div className="character" key={index}>
                <img src={character.character.images?.jpg.image_url} alt="" />
                <h4>{character.character.name}</h4>
                <p>{character.role}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimeItem;
