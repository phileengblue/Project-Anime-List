import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimeItem from './Components/AnimeItem/AnimeItem';
import Homepage from './Components/HomePage/Homepage';
import FavoritesPage from './Components/Favorite/FavoritesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
