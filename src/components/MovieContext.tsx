import React, { createContext, useState, ReactNode } from 'react';

interface MovieContextProps {
  movieId: string;
  setMovieId: React.Dispatch<React.SetStateAction<string>>;
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movieId, setMovieId] = useState('');

  return (
    <MovieContext.Provider value={{ movieId, setMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => {
  const context = React.useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

export {};
