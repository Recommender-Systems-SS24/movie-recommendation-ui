import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MovieComponent from './MovieComponent';
import { MovieRecommendationList } from '../types/Movie';
import React, { useState } from 'react';
import { getSimilarMovies } from '../services/api';

export default function RecommendedMovies({ movieID, listNr }: { movieID: string, listNr: number}) {

  const [recommendedMovies, setRecommendedMovies] = useState<MovieRecommendationList>();

  React.useEffect(() => {

    setRecommendedMovies(undefined);

    getSimilarMovies(movieID, listNr).then((jsonData) => {
      setRecommendedMovies(jsonData as MovieRecommendationList);
    }).catch((error) => {
      console.error(error);
    });
  }, [movieID]);

  return (
    <Box
      id="recommended-movies"
      color="inherit"
      sx={{
        display: recommendedMovies ? 'initial' : 'none',
      }}
    >
      <Container>
        <p style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: 'bold' }}>
          {recommendedMovies?.Name}
        </p>

        <Grid container columns={{ xs: 10, sm: 20, md: 20 }}>
          {recommendedMovies?.List.map((movie, _) => (
            <Grid item xs={2} sm={4} md={4} key={movie.MovieID}>
              <MovieComponent movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
