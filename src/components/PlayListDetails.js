import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import { Grid, Typography } from "@mui/material";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PlayListDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieList, setMovieList] = useState([]);
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
    <div style={{ padding: "2rem" }}>
      <h1>{movie.name}</h1>
      <Grid container spacing={3}>
        {movieList.map((list) => (
          <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
            <MovieCard
              movie={list}
              //   onClick={() => handleOpenModal(movie)}
              //   handleAddtoList={() => handleAddtoList(movie)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default PlayListDetails;
