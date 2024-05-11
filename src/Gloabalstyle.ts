import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
  }

  body {
    color: #d9d9d9; /* Colore del testo principale */
    font-size: 1.4rem; /* Dimensione del testo principale */

    background-color: #282c37; /* Colore dello sfondo */
  }

  /* Stile della scrollbar */
  body::-webkit-scrollbar {
    width: 10px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: #27ae60; /* Colore del thumb */
    border-radius: 10px; /* Bordi arrotondati */
  }

  body::-webkit-scrollbar-track {
    background-color: #282c37; /* Colore della traccia */
  }
`;

export default GlobalStyle;
