import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import CreatePlayListModal from "../components/CreatePlayListModal";
import { UserState } from "../Context/UserProvider";
import { toast } from "react-toastify";
const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Search = () => {
  const { user } = UserState();
  const [SearchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [playlistName, setPlayListName] = useState("");

  const [isCreateModal, setCreateModal] = useState(false);
  const [playList, setPlaylist] = useState([]);

  const handleOpenModal = async (movie) => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}&plot=full`
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

  const handleSearchMovie = async () => {
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${search}&apikey=${API_KEY}`
      );
      setSearchMovies(response.data.Search || []);
      console.log(response);
      if (response.data.Error) {
        toast.error("Movie not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateClose = () => {
    setCreateModal(false);
  };

  const handleAddtoList = async (movie) => {
    // console.log(movie, "movie");
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
      toast.success("Created new playlist!");
      setPlayListName("");
      setCreateModal(false);
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
      toast.success("Added movie to your playlist!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <SearchBar
        value={search}
        onClick={handleSearchMovie}
        setSearch={setSearch}
      />
      <Box
        sx={{
          padding: 12,
          width: "80%",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <Grid container spacing={3}>
          {SearchMovies.map((movie) => (
            <Grid item key={movie.imdbID} xs={12} sm={6} md={4}>
              <MovieCard
                movie={movie}
                onClick={() => handleOpenModal(movie)}
                handleAddtoList={() => handleAddtoList(movie)}
                selected={movie}
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

export default Search;
