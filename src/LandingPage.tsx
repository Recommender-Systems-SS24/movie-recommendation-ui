import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppAppBar';
import Header from './components/Header';
import Footer from './components/Footer';
import MovieSearch from './components/MovieSearch';
import SearchResults from './components/SearchResults';
import { SearchProvider } from './components/SearchContext';
import NotFound from './NotFound';
import MovieDetails from './components/MovieDetails';
import { MovieProvider } from './components/MovieContext';

export default function LandingPage() {
  const [mode, setMode] = React.useState<PaletteMode>('light');
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>

        <CssBaseline />
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        <Box sx={(theme) => ({
          bgcolor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          backgroundImage:
            theme.palette.mode === 'light'
              ? 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)'
              : 'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
          backgroundRepeat: 'no-repeat',
          pt: { xs: 10, sm: 15 },
        })}
        >
          <Routes>
            <Route path="/" element={
              <SearchProvider>
                <Header />
                <MovieSearch />
                <SearchResults />
              </SearchProvider>
            } />
            <Route path="/movie/:movieID" element={<MovieProvider><MovieDetails /></MovieProvider>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Divider sx={{
            pb: { xs: 4, sm: 6 },
          }} />
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}
