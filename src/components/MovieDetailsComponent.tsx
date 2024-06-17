import { Grid, Stack, Card, Typography, Rating, Box, IconButton, styled } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/PlayCircleOutline';
import StarIcon from '@mui/icons-material/Star';
import { useMovie } from "./MovieContext";
import React, { useState } from "react";
import { getMovieDetails, getMoviePosterURL } from "../services/api";

const defaultPoster = '/default-poster.png';

const ThumbnailContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'inline-block',
  width: '100%',
  '&:hover .playButton': {
    opacity: 1,
  },
}));

const Image = styled('img')({
  display: 'block',
  width: '100%',
  height: 'auto',
});

const PlayButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
}));

const PlayIcon = styled(YouTubeIcon)(({ theme }) => ({
  fontSize: '8rem',
}));

interface MovieData {
  ID: string;
  Title: string;
  Actors: string;
  ReleaseYear: string;
  Directors: string;
  Genres: string;
  Rated: string;
  Runtime: string;
  Plot: string;
  Poster: string;
  Rating: number;
  TrailerURL: string;
}

export default function MovieDetailsComponent(): JSX.Element {

  const { movieId } = useMovie();

  const [movieData, setMovieData] = useState<MovieData>();

  React.useEffect(() => {

    getMovieDetails(movieId ?? '').then((jsonData) => {
      const movieData: MovieData = {
        ID: movieId ?? '',
        Title: jsonData.movielens.title,
        Actors: jsonData.movielens.actors.slice(0, 5).join(", "),
        ReleaseYear: jsonData.movielens.releaseYear,
        Directors: jsonData.movielens.directors.join(", "),
        Genres: jsonData.movielens.genres.join(", "),
        Rated: jsonData.movielens.mpaa,
        Runtime: jsonData.movielens.runtime.toString(),
        Plot: jsonData.movielens.plotSummary,
        Poster: getMoviePosterURL(movieId ?? ''),
        Rating: jsonData.movielens.avgRating,
        TrailerURL: "https://www.youtube.com/watch?v=" + jsonData.movielens.youtubeTrailerIds[0],
      };

      setMovieData(movieData);
      console.log(movieData);
    }).catch((error) => {
      console.error(error);
    });

    window.scrollTo(0, 0);
  }, [movieId]);

  const [posterLoaded, setPosterLoaded] = useState(false);
  const handlePosterLoaded = () => {
    setPosterLoaded(true);
  };

  return (

    <Grid>
      <Grid item xs={12} sm={6} md={4}>
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
          {movieData && (
            <Stack
              direction={{ xs: 'row', sm: 'row' }}
              spacing={3}
              useFlexGap
              sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
            >
              <div style={{ boxShadow: '0 0 150px 100px rgba(74, 144, 226, 0.2)', borderRadius: '10px', minWidth: '230px' }}>
                <ThumbnailContainer>
                  <Image
                    src={(movieData.Poster)}
                    alt={movieData.Title}
                    style={{ borderRadius: '10px' }}
                    onLoad={() => handlePosterLoaded()}
                    sx={{ display: posterLoaded ? 'initial' : 'none' }}
                  />

                  <Image
                    src={(defaultPoster)}
                    alt={movieData.Title}
                    style={{ borderRadius: '10px' }}
                    sx={{ display: posterLoaded ? 'none' : 'initial' }}
                  />
                  <PlayButton className="playButton" onClick={() => window.open(movieData.TrailerURL, '_blank')}>
                    <PlayIcon />
                  </PlayButton>
                </ThumbnailContainer>
              </div>

              <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexDirection: 'column', width: '100%' }}>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                    <Typography fontWeight="bold" fontSize={32} gutterBottom>
                      {movieData.Title}
                    </Typography>

                    <div style={{ textAlign: 'left', display: 'flex', justifyContent: 'space-between', flexDirection: 'row', gap: '20px' }}>
                      <div>
                        <Rating
                          name="user-rating"
                          readOnly
                          size='large'
                          precision={0.1}
                          value={movieData.Rating}
                          emptyIcon={<StarIcon style={{ opacity: 1, color: 'grey', fontSize: 'inherit' }} />}
                        />
                      </div>
                    </div>
                  </div>

                  <Typography fontWeight="medium" gutterBottom>
                    {movieData.Plot}
                  </Typography>
                </div>

                <div>
                  <Typography fontWeight="medium" gutterBottom>
                    {movieData.ReleaseYear + ' | ' + movieData.Rated + ' | ' + movieData.Runtime + ' | ' + movieData.Genres}
                  </Typography>

                  <Typography fontWeight="medium" gutterBottom>
                    Directors: {movieData.Directors}
                  </Typography>

                  <Typography fontWeight="medium" gutterBottom>
                    Starring: {movieData.Actors}
                  </Typography>
                </div>
              </div>
            </Stack>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}