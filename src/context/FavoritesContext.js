import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  function isFavorite(id) {
    return favorites.some((book) => book.id === id);
  }

  function toggleFavorite(book) {
    if (isFavorite(book.id)) {
      setFavorites(favorites.filter((item) => item.id !== book.id));
    } else {
      setFavorites([...favorites, book]);
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
