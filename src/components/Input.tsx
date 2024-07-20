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
import { useEffect, useState } from "react";
//Hocks

//Components
import Result from "./Result";
import Loader from "./Loader";
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
  useEffect(() => {
    if (pastedURL === "" && shortURL !== "") {
      SetShortURL("");
      setShowResultComponent(false);
    }
  }, [pastedURL, shortURL]);
  function handleExcuteClick() { //API Call
   
      if (pastedURL === "") {
        alert("قم بإدخال رابط");
        setShowResultComponent(false);
        return;
      }
      setIsLoading(true);
      setShowResultComponent(false);
      SetShortURL(""); // Reset shortURL before making a new API call
    axios
      .post(
        "https://api.tinyurl.com/create",
        {
          url: pastedURL,
          domain: "tinyurl.com", 
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
  
      <Grid container mt={5}>
        <Grid xs={8}>
          <TextField
            sx={{
              width: "100%",
              borderRadius: "20px",
              "& .MuiInputLabel-root": {
                color: "rgba(255, 255, 255, 0.7)", 
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#FFA500", 
              },
              "& .MuiInputBase-input": {
                color: "white", 
              },
              "& .MuiFilledInput-underline:before": {
                borderBottomColor: "rgba(255, 255, 255, 0.4)", 
              },
              "& .MuiFilledInput-underline:after": {
                borderBottomColor: "#FFA500", 
              },
              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgba(255, 255, 255, 0.6)", 
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)", 
                },
                "&.Mui-focused": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)", 
                },
              },
            }}
            id="filled-basic"
            label="الرابط الإساسي" 
            variant="filled"
            value={pastedURL}
            onChange={(event) => {
              const newValue = event.target.value;
              setPastedURL(newValue);
              if (newValue === "") {
                SetShortURL("");
                setShowResultComponent(false);
              }
            }}
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
                bgcolor: "#FF8C00", 
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
            bgcolor: "#FF8C00", 
          },
          fontSize: "24px",
        }}
        onClick={handleExcuteClick}
      >
        <ArrowBackIosNewIcon sx={{ marginRight: "6px" }} />
        تنفيذ
      </Button>

      {showResultComponent &&   <Result shortUrl={shortURL} />}
    </>
  );
}
