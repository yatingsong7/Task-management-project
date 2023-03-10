import { createTheme, ThemeOptions } from "@mui/material";

const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F2CD5C",
      light: "#C3ACD0",
      dark: "#674188",
    },

    background: {
      default: "#2D033B",
      paper: "#2D033B",
    },

    text: {
      primary: "#F7EFE5",
      secondary: "#F2CD5C",
    },
  },
});

export default customTheme;
