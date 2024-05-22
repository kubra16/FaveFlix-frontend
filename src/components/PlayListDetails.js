import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Box, Grid, Typography } from "@mui/material";
import { UserState } from "../Context/UserProvider";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PlayListDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const { user } = UserState();
  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/playlist/public/${id}`);
        const data = await response.json();
        console.log(data);
        setMovie(data);
        setMovieList(data.movies);
        console.log(movieList);
      } catch (error) {
        console.error("Error fetching playlist details:", error);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  return (
    <>
      {movie.isPublic ? (
        <div style={{ padding: "2rem" }}>
          <h1>{movie.name}</h1>
          <Grid container spacing={3}>
            {movieList.length === 0 ? (
              <Typography variant="h4" component="h1" gutterBottom>
                Your playlist is empty
              </Typography>
            ) : (
              <Box
                sx={{
                  padding: 12,
                  width: "80%",
                  margin: "auto",
                  textAlign: "center",
                }}
              >
                <Grid container spacing={3}>
                  {movieList.map((list) => (
                    <Grid item key={list.imdbID} xs={12} sm={6} md={4}>
                      <MovieCard isPlaylist={true} movie={list} />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}
          </Grid>
        </div>
      ) : user && movie.user === user._id ? (
        <div style={{ padding: "2rem" }}>
          <h1>{movie.name}</h1>
          <Box
            sx={{
              padding: 12,
              width: "80%",
              margin: "auto",
              textAlign: "center",
            }}
          >
            <Grid container spacing={3}>
              {movieList.map((list) => (
                <Grid item key={list.imdbID} xs={12} sm={6} md={4}>
                  <MovieCard isPlaylist={true} movie={list} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </div>
      ) : (
        <Typography variant="h4" component="h1" gutterBottom>
          You cannot access this playlist
        </Typography>
      )}
    </>
  );
};

export default PlayListDetails;
