import axios from 'axios';
import { Anime } from '../models/types'; 

// Definizione dell'URL di base per le chiamate API
const baseUrl = 'https://api.jikan.moe/v4';

// Funzione per cercare un anime
export const searchAnime = async (anime: string): Promise<Anime[]> => {
  try {
    const response = await axios.get(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
    return response.data.data;
  } catch (error) {
    console.error('Error searching anime:', error);
    return [];
  }
};
