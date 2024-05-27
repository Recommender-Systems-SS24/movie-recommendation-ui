import { useState } from 'react';
import { searchMovies } from '../services/api';
import { useSearch } from './SearchContext';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { Button, TextField } from '@mui/material';

export default function MovieSearch() {

  const { setSearchResults } = useSearch();

  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleKeyDown = (e: { key: string; }) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }

    setLoading(true);

    try {
      const movies = await searchMovies(searchQuery);
      setSearchResults(movies);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      id="movie-search"
      sx={{
        pt: { xs: 2, sm: 4 },
        pb: { xs: 4, sm: 6 },
        color: 'white',
      }}
    >

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pb: { xs: 3, sm: 6 },
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
          useFlexGap
          sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
        >
          <TextField
            style={{ width: '100%' }}
            hiddenLabel
            fullWidth
            size="small"
            variant="outlined"
            aria-label="Enter movie name"
            placeholder="Movie name"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button variant="contained" color="primary" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
