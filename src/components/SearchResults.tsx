import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useSearch } from './SearchContext';
import MovieComponent from './MovieComponent';

export default function SearchResults() {

  const { searchResults } = useSearch();
  
  return (
    <Box
      id="search-results"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
        display: searchResults.length ? 'block' : 'none',
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
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Search results
          </Typography>
        </Box>

        <Grid container spacing={2} columns={{ xs: 8, sm: 16, md: 16 }}>
          {searchResults.map((movie, _) => (
            <Grid item xs={2} sm={4} md={4} key={movie.MovieID}>
              <MovieComponent movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
