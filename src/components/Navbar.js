import {
  AppBar,
  Button,
  Container,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./Styles.module.css";
import ThemeToggleButton from "./ThemeToggleButton";
import { UserState } from "../Context/UserProvider";

const Navbar = ({ themeMode, toggleTheme }) => {
  const theme = useTheme();
  const { setUser } = UserState();
  const logout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
  };
  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Container>
        <Toolbar>
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
          {/* <div style={{ display: "flex", alignItems: "center" }}> */}
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
            }}
          >
            <Typography variant="h6">Home</Typography>
          </Link>
          <Link
            to="/search"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
            }}
          >
            <Typography variant="h6">Search</Typography>
          </Link>
          <Link
            to="/playlist"
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
              marginLeft: "1rem",
            }}
          >
            <Typography variant="h6">My Playlist</Typography>
          </Link>
          <div style={{ marginLeft: "1rem" }}>
            <ThemeToggleButton
              themeMode={themeMode}
              toggleTheme={toggleTheme}
            />
          </div>
          <Button onClick={logout}>Logout</Button>
          {/* </div> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
