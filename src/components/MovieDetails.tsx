import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useParams } from 'react-router-dom';
import RecommendedMovies from './RecommendedMovies';
import { useMovie } from './MovieContext';
import { useEffect } from 'react';
import { Container } from '@mui/material';
import MovieDetailsComponent from './MovieDetailsComponent';


export default function MovieDetails() {

  const { movieID } = useParams();
  const { setMovieId } = useMovie();

  useEffect(() => {
    setMovieId(movieID ?? '');
  }, [movieID, setMovieId]);

  return (

    <Box
      id="movie-details"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
        display: movieID ? 'block' : 'none',
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
        <Box
          sx={{
            width: { sm: '100%', md: '100%' },
            textAlign: { sm: 'left', md: 'center' },
            flexGrow: 1,
            gap: { xs: 2, sm: 4, md: 6 },
          }}
        >
          {movieID && (
            <MovieDetailsComponent />
          )}

          {movieID && (
            [1, 2, 3, 4, 5].map((listNr, _) => (
              <RecommendedMovies movieID={movieID} listNr={listNr} key={listNr} />
            ))
          )}
        </Box>
      </Container>
    </Box>

  );
}
