// lightTheme.js
import { purple, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
    purple: {
      main: purple[700],
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#ffff",
      paper: "#f0f0f0",
    },
    text: {
      primary: "#000000",
    },
  },
  typography: {
    h1: {
      fontFamily: "Raleway, Arial",
      fontSize: "1rem",
      fontWeight: 500,
      color: "#333",
      borderBottom: ".3 rem purple",
      "@media (max-width: 600px)": {
        width: ".0rem",
      },
    },
    h2: {
      fontFamily: "Raleway, Arial",
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#333",
      "@media (max-width: 600px)": {
        width: ".0rem",
      },
    },
    h5: {
      fontFamily: "Raleway, Arial",
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#333",
      "@media (max-width: 600px)": {
        width: ".0rem",
      },
    },
  },

  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "1rem",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
          marginLeft: ".5rem",
          borderRadius: "10px",
          marginTop: "1rem",
          // width: "150px",
          "@media (max-width: 600px)": {
            width: "100px",
          },
        },
        containedPrimary: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
          width: "100%",
        },
        containedList: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
          width: "5rem",
        },
        containedListDelete: {
          color: "white",
          backgroundColor: red[500],
          "&:hover": {
            backgroundColor: red[700],
          },
          width: "5rem",
        },
        containedSecondary: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
        },
      },
    },
    MuiModal: {
      styleOverrides: {},
    },
  },
});

export default lightTheme;
