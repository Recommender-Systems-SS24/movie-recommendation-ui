import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import MovieComponent from './MovieComponent';
import { Movie } from '../types/Movie';

export default function RecommendedMovies({ movies, name }: { movies: Movie[], name: string }) {

  return (
    <Box
      id="recommended-movies"
      color="inherit"
      sx={{
        display: movies.length ? 'initial' : 'none',
      }}
    >
      <Container>
        <p style={{ textAlign: 'left', fontSize: '1.5rem', fontWeight: 'bold' }}>
          Recommendations list {name}
        </p>

        <Grid container columns={{ xs: 10, sm: 20, md: 20 }}>
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
