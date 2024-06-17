import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { getMoviePosterURL } from '../services/api';
import { Stack, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './MovieComponent.module.css';

interface MovieComponentProps {
  movie: Movie;
}

const defaultPoster = '/default-poster.png';

const MovieComponent: React.FC<MovieComponentProps> = ({ movie }) => {

  const navigate = useNavigate();

  const posterURL = getMoviePosterURL(movie.MovieID);

  const [posterLoaded, setPosterLoaded] = useState(false);

  const handlePosterLoaded = () => {
    setPosterLoaded(true);
  };

  const handleImageClick = () => {
    navigate(`/movie/${movie.MovieID}`)
  };

  return (
    <Stack
      className={styles.movieComponent}
      direction="column"
      color="inherit"
      component={Card}
      sx={{
        p: 1,
        height: '100%',
        borderColor: 'hsla(220, 25%, 25%, .3)',
        width: '100%',
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <img
        src={(defaultPoster)}
        alt={movie.Title}
        style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded ? "none" : "initial", cursor: 'pointer' }}
        onClick={handleImageClick}
      />

      <img
        src={(posterURL)}
        onLoad={() => handlePosterLoaded()}
        alt={movie.Title}
        style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded ? "initial" : "none", cursor: 'pointer' }}
        onClick={handleImageClick}
      />

      <Typography fontWeight="medium" paddingTop={1}>
        {movie.Title}
      </Typography>
    </Stack>
  );
};

export default MovieComponent;
