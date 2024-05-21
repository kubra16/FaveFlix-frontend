import React from "react";
import Button from "@mui/material/Button";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ThemeToggleButton = ({ themeMode, toggleTheme }) => {
  return (
    <Button
      onClick={toggleTheme}
      startIcon={
        themeMode === "light" ? <Brightness4Icon /> : <Brightness7Icon />
      }
    >
      Toggle Theme
    </Button>
  );
};

export default ThemeToggleButton;
