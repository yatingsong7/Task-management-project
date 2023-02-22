import { createTheme, ThemeOptions } from "@mui/material";

const customTheme: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F7EFE5",
      light: "#C3ACD0",
      dark: "#674188",
    },

    background: {
      default: "#FFFBF5",
      paper: "#FFFBF5",
    },

    text: {
      primary: "#20262E",
    },
  },
});

export default customTheme;
