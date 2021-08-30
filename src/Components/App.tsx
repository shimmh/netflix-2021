import React from "react";
import Router from "Components/Router";
import GlobalStyles from "assets/styles/GlobalStyles";
import { ThemeProvider } from "styled-components";
import theme from "assets/styles/theme";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router />
        <GlobalStyles />
      </ThemeProvider>
    </>
  );
}

export default App;
