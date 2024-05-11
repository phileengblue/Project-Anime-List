import axios from 'axios';

// Funzione per recuperare gli anime in onda
export const fetchAiringAnime = async () => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=airing');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching airing anime:', error);
    throw error;
  }
};
