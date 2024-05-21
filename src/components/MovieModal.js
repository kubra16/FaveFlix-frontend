import React from "react";
import { Modal, Box, Typography, Button, useTheme } from "@mui/material";

const MovieModal = ({ isOpen, onClose, movie }) => {
  const theme = useTheme();
  if (!isOpen || !movie) return null;
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "1rem",
      }}
    >
      <Box
        sx={{
          width: 400,
          bgcolor: theme.palette.background.paper,
          p: 2,
          mx: "auto",
          my: "20%",
          boxShadow: theme.shadows[5],
          borderRadius: 2,
        }}
      >
        <Typography style={theme.typography.h2} gutterBottom>
          {movie.Title}
        </Typography>
        <div>
          <Typography style={theme.typography.h1} gutterBottom>
            Year: {movie.Year}
          </Typography>
        </div>
        <Typography style={theme.typography.h1} gutterBottom>
          Description: {truncateText(movie.Description || "N/A", 300)}
        </Typography>
        <Typography style={theme.typography.h1} gutterBottom>
          Ratings:{" "}
          {movie.Ratings
            ? movie.Ratings.map(
                (rating) => `${rating.Source}: ${rating.Value}`
              ).join(", ")
            : "N/A"}
        </Typography>
      </Box>
    </Modal>
  );
};

export default MovieModal;
