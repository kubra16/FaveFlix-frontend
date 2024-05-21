import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import axios from "axios";
import { UserState } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Playlist = () => {
  const {
    user,
    playlistName,
    setPlayListName,
    isCreateModal,
    setCreateModal,
    playList,
    setPlaylist,
  } = UserState();
  const useStyles = makeStyles((theme) => ({
    container: {
      padding: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    playlistItem: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "50%",
      padding: theme.spacing(2),
      backgroundColor: theme.palette.background.paper,
      borderRadius: theme.shape.borderRadius,
      // boxShadow: theme.shadows[2],
      marginBottom: theme.spacing(2),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
    },
    playlistName: {
      flexGrow: 1,
      color: theme.palette.text.primary,
    },
    copyButton: {
      marginLeft: theme.spacing(2),
    },
  }));
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const response = await axios.get(
          `${BASE_URL}api/playlist/${user?._id}`,
          config
        );
        console.log(response);
        setPlaylist(response.data || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [user]);

  const copyPlaylistLink = (playlistId) => {
    const playlistURL = `${window.location.origin}/public/${playlistId}`;
    navigator.clipboard.writeText(playlistURL);
    alert("Playlist link copied to clipboard!");
  };

  const handlePlaylistSelect = (playlist) => {
    const playlistURL = `/public/${playlist._id}`;
    navigate(playlistURL);
  };

  return (
    <Box className={classes.container}>
      <Grid container spacing={3}>
        {playList.map((list) => (
          <Grid item xs={12} key={list._id}>
            <Box
              className={classes.playlistItem}
              onClick={() => handlePlaylistSelect(list)}
            >
              <Typography variant="h5" className={classes.playlistName}>
                {list.name}
              </Typography>
              {list.isPublic && (
                <Button
                  style={theme.components.MuiButton.containedList}
                  className={classes.copyButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    copyPlaylistLink(list._id);
                  }}
                >
                  Copy link
                </Button>
              )}

              {console.log(list.isPublic)}
              <Button
                style={theme.components.MuiButton.containedList}
                className={classes.copyButton}
                onClick={(e) => {
                  e.stopPropagation();
                  copyPlaylistLink(list._id);
                }}
              >
                Make it public
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <MovieModal
      // isOpen={isModalOpen}
      // onClose={handleCloseModal}
      // movie={selectedMovie}
      />
    </Box>
  );
};

export default Playlist;
