import React, { useState } from 'react';
import { Movie } from '../types/Movie';
import { getMoviePosterURL } from '../services/api';
import { Grid, Stack, Card, Typography } from '@mui/material';

interface MovieComponentProps {
  movie: Movie;
}

const defaultPoster = '/default-poster.png';

const MovieComponent: React.FC<MovieComponentProps> = ({ movie }) => {

  const posterURL = getMoviePosterURL(movie.MovieID);

  const [posterLoaded, setPosterLoaded] = useState(false);

  const handlePosterLoaded = () => {
    setPosterLoaded(true);
  };

  return (

    <Grid item xs={12} sm={6} md={4}>
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
          style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded ? "none" : "initial" }}
        />

        <img
          src={(posterURL)}
          onLoad={() => handlePosterLoaded()}
          alt={movie.Title}
          style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded ? "initial" : "none" }}
        />

        <Typography fontWeight="medium" gutterBottom>
          {movie.Title}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default MovieComponent;
