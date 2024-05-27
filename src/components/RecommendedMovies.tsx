import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MovieComponent from './MovieComponent';
import { Movie } from '../types/Movie';
import { Typography } from '@mui/material';

export default function RecommendedMovies({ movies, name }: { movies: Movie[], name: string }) {

  return (
    <Box
      id="recommended-movies"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        display: movies.length ? 'block' : 'none',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Typography component="h3" variant="h4">
          Recommended movies {name}
        </Typography>

        <Grid container spacing={2} columns={{ xs: 10, sm: 20, md: 20 }}>
          {movies.map((movie, _) => (
            <Grid item xs={2} sm={4} md={4} key={movie.MovieID}>
              <MovieComponent movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
