import axios from 'axios';

// Funzione per recuperare gli anime in arrivo
export const fetchUpcomingAnime = async () => {
  try {
    const response = await axios.get('https://api.jikan.moe/v4/top/anime?filter=upcoming');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching upcoming anime:', error);
    throw error;
  }
};
