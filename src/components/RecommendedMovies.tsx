import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MovieComponent from './MovieComponent';
import { MovieRecommendationList } from '../types/Movie';
import React, { useState } from 'react';
import { getSimilarMovies } from '../services/api';
import { Typography } from '@mui/material';

export default function RecommendedMovies({ movieID, listNr }: { movieID: string, listNr: number }) {

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
      bgcolor={'hsl(220, 30%, 2%)'}
    >
      {
        recommendedMovies && (
          <Container
            sx={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="h4" variant="h5" align='left' pt={3} pb={1}>
              {recommendedMovies?.Name}
            </Typography>

            <Grid container columns={5}>
              {recommendedMovies?.List.map((movie, _) => (
                <Grid item xs={1} sm={1} md={1} key={movie.MovieID}>
                  <MovieComponent movie={movie} />
                </Grid>
              ))}
            </Grid>
          </Container>
        )
      }
    </Box>
  );
}
