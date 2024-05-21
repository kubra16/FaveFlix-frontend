import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography, useTheme } from "@mui/material";

const Input = ({ value, onClick, setPlayListName }) => {
  const theme = useTheme();

  const searchContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    margin: "20px 0",
  };

  const searchBoxStyle = {
    position: "relative",
    borderRadius: 4,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    width: "30rem",
    display: "flex",
    alignItems: "center",
  };

  const searchIconStyle = {
    padding: "10px",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.text.secondary,
  };

  const inputStyle = {
    paddingLeft: "40px",
    width: "100%",
    color: theme.palette.text.primary,
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Typography style={theme.typography.h2} gutterBottom>
          Add movie to playlist
        </Typography>
      </div>

      <div style={searchContainerStyle}>
        <div style={searchBoxStyle}>
          <TextField
            variant="outlined"
            placeholder="Your playlist name"
            sx={{
              ...inputStyle,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent",
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent",
                },
              },
            }}
            value={value}
            InputProps={{
              disableUnderline: true,
            }}
            onChange={(e) => setPlayListName(e.target.value)}
          />
        </div>
        <Button
          style={theme.components.MuiButton.containedSecondary}
          onClick={onClick}
        >
          Create playlist
        </Button>
      </div>
    </div>
  );
};

export default Input;
