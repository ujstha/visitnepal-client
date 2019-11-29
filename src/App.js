import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import routes from "./routes";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import HeaderContainer from "./containers/HeaderContainer";
import Footer from "./components/Footer";

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
        {/* {!localStorage.isAdmin || JSON.parse(localStorage.isAdmin) === null ? (
          <Router>{routes}</Router>
        ) : (
          <Router>
            <HeaderContainer />
            {routes}
            <Slide />
          </Router>
        )} */}
        <HeaderContainer />
        <Router>{routes}</Router>
        <Footer />
      </MuiThemeProvider>
    );
  }
}
