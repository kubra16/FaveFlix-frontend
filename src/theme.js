// theme.js
import { grey, purple, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    purple: {
      main: purple[700],
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
      fontFamily: "Raleway, Arial",

      fontSize: "1rem",
      fontWeight: 500,
      color: "#fff",
      borderBottom: ".3 rem purple",
    },
    h2: {
      fontFamily: "Raleway, Arial",
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
          marginLeft: ".5rem",
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
