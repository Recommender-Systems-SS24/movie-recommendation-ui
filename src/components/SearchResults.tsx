import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useSearch } from './SearchContext';
import { getMoviePosterURL } from '../services/api';
import { useState } from 'react';

export default function SearchResults() {

  const { searchResults } = useSearch();

  const [posterLoaded, setPosterLoaded] = useState<{ [key: string]: boolean }>({});
  const defaultPoster = '/default-poster.png';
  const handlePosterLoad = (movieID: string) => {
    setPosterLoaded({ ...posterLoaded, [movieID]: true });
  };

  return (
    <Box
      id="search-results"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
        bgcolor: 'hsl(220, 30%, 2%)',
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
        <Grid container spacing={2.5}>
          {searchResults.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
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
                  src={(getMoviePosterURL(item.MovieID))}
                  onLoad={() => handlePosterLoad(item.MovieID)}
                  alt={item.Title}
                  style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded[item.MovieID] ? "block" : "none" }}
                />

                <img
                  src={(defaultPoster)}
                  alt={item.Title}
                  style={{ borderRadius: '10px', flexGrow: 1, display: posterLoaded[item.MovieID] ? "none" : "block" }}
                />

                <Typography fontWeight="medium" gutterBottom>
                  {item.Title}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
