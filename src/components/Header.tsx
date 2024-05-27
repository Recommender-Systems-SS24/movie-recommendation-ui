import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Header() {
  return (
    <Box
      id="header"
      sx={{
        width: '100%',
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Stack
          spacing={2}
          alignItems="center"
          useFlexGap
          sx={{ width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Greatest&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'inherit',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              movie
            </Typography>
            &nbsp;database
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: { sm: '100%', md: '80%' } }}
          >
            Discover, Watch, Enjoy: Your Gateway to Cinematic Delight!
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
