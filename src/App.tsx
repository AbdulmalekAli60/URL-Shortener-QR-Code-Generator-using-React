import React from "react";
import "./App.css";

// MUI Library
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// MUI Library

//Components
import Input from "./components/Input";
import Footer from "./components/Footer";
//Components

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "NotoSansArabic, Arial, sans-serif",
    },
  });

  return (
  
    <ThemeProvider theme={theme}>
      <div className="App">
        <Container style={{ height: "100%", marginTop: "10px" }} maxWidth="sm">
          <Typography
            variant="h3"
            component="h5"
            style={{
              fontFamily: theme.typography.fontFamily,
              fontWeight: "normal",
            }}
          >
            إجعل روابطك أقصر
          </Typography>
          <Input />
          {/* <ExcuteBtn />  combined with Input */}
          {/* <Result /> input will show the result */}
        </Container>

        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
