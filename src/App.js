import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import HeaderContainer from "./containers/HeaderContainer";
import Slide from "./components/slide";

const theme = createMuiTheme({
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Montserrat", "sans-serif"].join(","),
  },
});

export default class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <HeaderContainer />
        <Router>{routes}</Router>
        <Slide />
      </MuiThemeProvider>
    );
  }
}
