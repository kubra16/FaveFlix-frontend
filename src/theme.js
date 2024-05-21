// theme.js
import { grey, purple } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    background: {
      default: "#121212",
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff",
    },
  },
  typography: {
    h1: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#fff",
      borderBottom: ".3 rem purple",
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#FFF",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "14px",
          borderRadius: "12",
          background: grey[900],
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: grey[800],
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

          borderRadius: "10px",
          marginTop: "1rem",
        },
        containedPrimary: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
          width: "100%",
        },
        containedSecondary: {
          color: "white",
          backgroundColor: purple[500],
          "&:hover": {
            backgroundColor: purple[700],
          },
          marginLeft: "1rem",
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          color: grey[800],
        },
      },
    },
  },
});

export default darkTheme;
