import { createMuiTheme } from "@material-ui/core/styles";

// --goldenrod: #08d765ff;
// --onyx: #373C3Eff;
// --jet: #303232ff;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#303232",
    },
    secondary: {
      main: "#08d765",
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      disableElevation: true,
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundColor: "#303232",
          color: "#08d765",
        },
      },
    },
  },
});

export const buttonPadding = "0.7em 5em";
export const buttonRadius = 25;

export default theme;
