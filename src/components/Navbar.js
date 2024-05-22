import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Styles.module.css";
import ThemeToggleButton from "./ThemeToggleButton";
import { UserState } from "../Context/UserProvider";
import { useLocation } from "react-router-dom";

const Navbar = ({ themeMode, toggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const { setUser } = UserState();
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    navigate("/");
    // window.location.reload();
  };
  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <LiveTvIcon
            sx={{
              display: { xs: "none", md: "flex" },
              fontSize: "2.5rem",
              mr: 2,
              color: theme.palette.text.primary,
            }}
          />
          <Typography variant="h5" sx={{ color: theme.palette.text.primary }}>
            FaveFlix
          </Typography>
          <NavLink
            to="/home"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
              borderBottom: "2px solid",
              borderColor:
                location.pathname === "/home"
                  ? theme.palette.purple.main
                  : "transparent",
            }}
          >
            <Typography variant="h6">Home</Typography>
          </NavLink>
          <NavLink
            to="/search"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
              borderBottom: "2px solid",
              borderColor:
                location.pathname === "/search"
                  ? theme.palette.purple.main
                  : "transparent",
            }}
          >
            <Typography variant="h6">Search</Typography>
          </NavLink>
          <NavLink
            to="/playlist"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
              borderBottom: "2px solid",
              borderColor:
                location.pathname === "/playlist"
                  ? theme.palette.purple.main
                  : "transparent",
            }}
          >
            <Typography variant="h6">My Playlist</Typography>
          </NavLink>
        </div>
        <div>
          <ThemeToggleButton themeMode={themeMode} toggleTheme={toggleTheme} />
          <Button onClick={logout} style={{ marginLeft: "1rem" }}>
            Logout
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
