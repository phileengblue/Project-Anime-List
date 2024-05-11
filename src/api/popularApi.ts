import axios from 'axios';

// Funzione per recuperare gli anime popolari
export const fetchPopularAnime = async () => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=bypopularity');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching popular anime:', error);
    throw error;
  }
};
