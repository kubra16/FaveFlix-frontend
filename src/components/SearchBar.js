import React from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Button, Typography, useTheme } from "@mui/material";

const SearchBar = ({ value, onClick, setSearch }) => {
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
          Search your movie
        </Typography>
      </div>

      <div style={searchContainerStyle}>
        <div style={searchBoxStyle}>
          <div style={searchIconStyle}>
            <SearchIcon />
          </div>
          <TextField
            variant="outlined"
            placeholder="Search..."
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
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button
          style={theme.components.MuiButton.containedSecondary}
          onClick={onClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
