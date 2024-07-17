//MUI Library
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
//MUI Icons
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//MUI Icons
//MUI Library

//External Librarys
import axios from "axios";
//External Librarys

//Hocks
import { useState } from "react";
//Hocks

//Components
import Result from "./Result";
import Loader from "./Loader";
import SnackBar from "./SnackBar";
//Components

export default function Input() {
  const [pastedURL, setPastedURL] = useState<string>("");
  const [shortURL, SetShortURL] = useState<string>(""); // Holds the shortened URL
  const [isLoading, setIsLoading] = useState<boolean>(false); //Loader
  const [showResultComponent, setShowResultComponent] = useState(false);
  const theme = useTheme();
  const API_KEY = process.env.REACT_APP_TinyURL_API_Key;
  //Event Handlers
  const handlePasteClick = () => {
    navigator.clipboard
      .readText()
      .then((text) => setPastedURL(text))
      .catch((err) => alert(err));
  };

  function handleExcuteClick() {
    if (pastedURL === "") {
      alert("قم بإدخال رابط");
      setShowResultComponent(false);
      return;
    }
    setIsLoading(true);
    setShowResultComponent(false);
    axios
      .post(
        "https://api.tinyurl.com/create",
        {
          url: pastedURL,
          domain: "tinyurl.com", // This is optional
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Shortened URL:", response.data.data.tiny_url);
        SetShortURL(response.data.data.tiny_url);
        setIsLoading(false);
        setShowResultComponent(true);
      })
      .catch((error) => {
        console.error("Error:", error);

        let errorMessage = "حدث خطأ أثناء تقصير الرابط"; // Default error message

        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          errorMessage = error.response.data.errors[0] || errorMessage;
        } else if (error.message) {
          errorMessage = error.message;
        }

        if (errorMessage === "Invalid URL.") errorMessage = "الرابط غير صالح";

        alert(errorMessage);
        setIsLoading(false);
        setPastedURL("");
      });
  }
  //Event Handlers
  return (
    <>
      {isLoading && <Loader open={isLoading} />}
      {/* {!isLoading && <Result shortUrl={result}/>} */}

      <Grid container mt={5}>
        <Grid xs={8}>
          <TextField
            sx={{
              width: "100%",
              borderRadius: "20px",
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)", // Light gray, slightly transparent
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFA500", // Bright orange, matching the button color
              },
              "& .MuiInputBase-input": {
                color: "white", // White text
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent white
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FFA500", // Bright orange when focused
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgba(255, 255, 255, 0.6)", // Slightly more opaque on hover
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Very light background
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)", // Slightly darker on hover
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", // Even darker when focused
                },
              },
            }}
            id="filled-basic"
            label="URL"
            variant="filled"
            value={pastedURL}
            onChange={(event) => setPastedURL(event.target.value)}
          />
        </Grid>
        <Grid xs={4}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "0px 20px 20px 0px",
              boxShadow: "none",
              fontFamily: theme.typography.fontFamily,
              fontWeight: "normal",
              bgcolor: "#FFA600",
              color: "white",
              "&:hover": {
                bgcolor: "#FF8C00", // Darker orange on hover
              },
            }}
            onClick={handlePasteClick}
          >
            <ContentPasteIcon sx={{ marginRight: "6px" }} />
            إلصق الرابط
          </Button>
        </Grid>
      </Grid>
      <Button
        variant="contained"
        sx={{
          width: "50%",
          margin: "20px 0 0 0",
          borderRadius: "20px",
          fontFamily: theme.typography.fontFamily,
          fontWeight: "normal",
          bgcolor: "#FFA600",
          color: "white",
          "&:hover": {
            bgcolor: "#FF8C00", // Darker orange on hover
          },
          fontSize: "24px",
        }}
        onClick={handleExcuteClick}
      >
        <ArrowBackIosNewIcon sx={{ marginRight: "6px" }} />
        تنفيذ
      </Button>

      {showResultComponent && !isLoading && <Result shortUrl={shortURL} />}
    </>
  );
}
