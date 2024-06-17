import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { getMoviePosterURL } from '../services/api';
import { Stack, Card, Typography, Container, Rating } from '@mui/material';
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
        borderColor: 'hsla(220, 25%, 25%, .3)',
        background: 'transparent',
        boxShadow: 'none',
      }}
    >
      <Container className={styles.posterContainer}>
        <img
          className={styles.posterImage}
          src={(defaultPoster)}
          alt={movie.Title}
          style={{ borderRadius: '10px', display: posterLoaded ? "none" : "initial", cursor: 'pointer' }}
          onClick={handleImageClick}
        />

        <img
          className={styles.posterImage}
          src={(posterURL)}
          onLoad={() => handlePosterLoaded()}
          alt={movie.Title}
          style={{ borderRadius: '10px', display: posterLoaded ? "initial" : "none", cursor: 'pointer' }}
          onClick={handleImageClick}
        />

        <Container className={styles.hoverComponentTop}>
          <Rating name="read-only" value={movie.Rating} precision={0.1} readOnly size='small' />
        </Container>

        <Container className={styles.hoverComponentBottom}>
          <Typography fontSize={10}>
            {movie.Genres.join(', ')}
          </Typography>
        </Container>
      </Container>

      <Typography fontWeight="medium" paddingTop={1}>
        {movie.Title}
      </Typography>
    </Stack>
  );
};

export default MovieComponent;
