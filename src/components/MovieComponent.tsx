import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { getMoviePosterURL } from '../services/api';
import { Stack, Card, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
      direction="column"
      color="inherit"
      component={Card}
      spacing={1}
      useFlexGap
      sx={{
        p: 3,
        height: '100%',
        border: '1px solid',
        borderColor: 'hsla(220, 25%, 25%, .3)',
        background: 'transparent',
        backgroundColor: 'grey.900',
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

      <Typography fontWeight="medium" gutterBottom>
        {movie.Title}
      </Typography>
    </Stack>
  );
};

export default MovieComponent;
