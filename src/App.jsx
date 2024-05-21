import React, { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import "./App.css";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Search from "./Pages/Search";
import Playlist from "./Pages/Playlist";
import PlayListDetails from "./components/PlayListDetails";
import Navbar from "./components/Navbar";
import { UserState } from "./Context/UserProvider";
import { CssBaseline, ThemeProvider } from "@mui/material";
import darkTheme from './theme';
import lightTheme from './lightTheme';

function App() {
  const [themeMode, setThemeMode] = useState('light'); 
    const navigate = useNavigate();
  const toggleTheme = () => {
    setThemeMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };
  const theme = themeMode === 'light' ? lightTheme : darkTheme;
  const { user } = UserState();

   const location = useLocation();
    const hideNavbarRoutes = ["/"]
  return (
    
    <ThemeProvider theme={theme}>
     <ToastContainer />
      <CssBaseline />
      <div className="app">
         {!hideNavbarRoutes.includes(location.pathname) && user && (
          <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />
        )}
        <div className="content">
        <Routes>
  <Route path="/" element={<Login />} />
  <Route
    path="/home"
    element={user ? <Home /> : <Navigate to="/" />}
  />
  <Route
    path="/search"
    element={user ? <Search /> : <Navigate to="/" />}
  />
  <Route
    path="/playlist"
    element={user ? <Playlist /> : <Navigate to="/" />}
  />
  <Route path="/public/:id" element={<PlayListDetails />} />
</Routes>

        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
