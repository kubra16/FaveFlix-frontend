import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import axios from "axios";
import MovieModal from "../components/MovieModal";
import { UserState } from "../Context/UserProvider";
import CreatePlayListModal from "../components/CreatePlayListModal";
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Home = () => {
  const {
    user,
    playlistName,
    setPlayListName,
    isCreateModal,
    setCreateModal,
    playList,
    setPlaylist,
  } = UserState();
  console.log(user?.token);
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?s=action&apikey=${API_KEY}`
        );
        setMovies(response.data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleOpenModal = async (movie) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}&plot=full`
      );
      const detailedMovie = {
        ...movie,
        Description: response.data.Plot,
        Ratings: response.data.Ratings,
      };
      setSelectedMovie(detailedMovie);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateClose = () => {
    setCreateModal(false);
  };

  const handleAddtoList = async (movie) => {
    setSelectedMovie(movie);
    setCreateModal(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.get(
        `${BASE_URL}api/playlist/${user._id}`,
        config
      );
      setPlaylist(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddtoPlaylist = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      let FormData = {
        name: playlistName,
        user: user?._id,
        movies: [],
        isPublic: false,
      };

      const response = await axios.post(
        `${BASE_URL}api/playlist`,
        FormData,
        config
      );
      setPlayListName("");
      handleAddtoList();
    } catch (err) {
      console.log(err);
    }
  };
  const handleMoviesToPlaylist = async (playlistId, movie) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const newMovie = {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      };
      const response = await axios
        .post(`${BASE_URL}api/playlist/${playlistId}/movies`, newMovie, config)
        .then((response) => setCreateModal(false));
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      {/* <Navbar /> */}
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Home
        </Typography>
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
              <MovieCard
                movie={movie}
                onClick={() => handleOpenModal(movie)}
                handleAddtoList={() => handleAddtoList(movie)}
              />
            </Grid>
          ))}
        </Grid>
        <MovieModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          movie={selectedMovie}
        />
        <CreatePlayListModal
          isOpen={isCreateModal}
          onClose={handleCreateClose}
          playList={playList}
          setPlaylist={setPlaylist}
          playlistName={playlistName}
          setPlayListName={setPlayListName}
          handleAddtoPlaylist={handleAddtoPlaylist}
          handleMoviesToPlaylist={handleMoviesToPlaylist}
          movie={selectedMovie}
        />
      </Box>
    </div>
  );
};

export default Home;
