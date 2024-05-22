import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Paper,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import { grey, purple } from "@mui/material/colors";
import { useTheme } from "@emotion/react";
import { UserState } from "../Context/UserProvider";

const MovieCard = ({ isPlaylist, movie, onClick, handleAddtoList }) => {
  const theme = useTheme();
  const { user } = UserState();
  // console.log(user);

  return (
    <div>
      <Paper elevation={8}>
        <div onClick={onClick}>
          <Card>
            <CardMedia
              component="img"
              height="240"
              image={movie.Poster || movie.poster}
              alt={movie.Title || movie.title}
            />

            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {movie.Title || movie.title}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {movie.Year || movie.year}
              </Typography>
            </CardContent>
          </Card>
        </div>
        {!isPlaylist && (
          <Button variant="contained" onClick={handleAddtoList}>
            Add to playlist
          </Button>
        )}
      </Paper>
    </div>
  );
};

export default MovieCard;
