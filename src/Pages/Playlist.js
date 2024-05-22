import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MovieCard from "../components/MovieCard";
import MovieModal from "../components/MovieModal";
import axios from "axios";
import { UserState } from "../Context/UserProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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
      marginTop: "5rem",
    },

    playlistItem: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "70%",
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
      setPlaylist(response.data || []);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
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

  const handleMakePublic = async (list) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}api/playlist/${list}/public`,
        null,
        config
      );
      toast.success("Playlist marked as public!");
      fetchMovies();
    } catch (err) {
      console.error("Error marking playlist as public:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  const handleMakePrivate = async (list) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.put(
        `${BASE_URL}api/playlist/${list}/private`,
        null,
        config
      );
      toast.success("Playlist marked as private!");
      fetchMovies();
    } catch (err) {
      console.error("Error marking playlist as private:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  const handleDeletePlayList = async (list) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const response = await axios.delete(
        `${BASE_URL}api/playlist/${list}/delete`,
        config
      );
      toast.success("Playlist deleted successfully!");
      fetchMovies();
    } catch (err) {
      console.error("Error deleting playlist:", err);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      <Box className={classes.container}>
        <Grid container spacing={3}>
          {playList.map((list) => (
            <Grid item xs={12} key={list._id}>
              <Box
                className={classes.playlistItem}
                onClick={() => handlePlaylistSelect(list)}
              >
                <Typography
                  style={theme.typography.h5}
                  className={classes.playlistName}
                >
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
                {list.isPublic === false ? (
                  <Button
                    style={theme.components.MuiButton.containedList}
                    className={classes.copyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMakePublic(list._id);
                    }}
                  >
                    Make it public
                  </Button>
                ) : (
                  <Button
                    style={theme.components.MuiButton.containedList}
                    className={classes.copyButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMakePrivate(list._id);
                    }}
                  >
                    Make it private
                  </Button>
                )}
                <Button
                  style={
                    theme.components.MuiButton.styleOverrides
                      .containedListDelete
                  }
                  // className={classes.copyButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePlayList(list._id);
                  }}
                >
                  Delete
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
    </div>
  );
};

export default Playlist;
