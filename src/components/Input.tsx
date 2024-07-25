//MUI Library
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
//MUI Icons
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
//MUI Icons

//Hocks
import { useEffect, useState } from "react";
import { useShortener } from "../hocks/useShortener";
//Hocks

//Components
import Result from "./Result";
import Loader from "./Loader";
import SnackBar from "./SnackBar";
//Components

export default function Input() {
  const [pastedURL, setPastedURL] = useState("");
  const { shortenUrl, shortUrl, isLoading, error } = useShortener();
  const [showResultComponent, setShowResultComponent] = useState(false);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (error) {
      setShowSnackBar(true);
      setTimeout(() => setShowSnackBar(false), 3000);
    }
  }, [error]);

  useEffect(() => {
    if (pastedURL === "" && shortUrl !== "") {
      setShowResultComponent(false);
    }
  }, [pastedURL, shortUrl]);

  const handlePasteClick = () => {
    navigator.clipboard
      .readText()
      .then((text) => setPastedURL(text))
      .catch((err) => {
        console.error("Clipboard read failed:", err);
        setShowSnackBar(true);
      });
  };

  const handleExcuteClick = async () => {
    if (pastedURL === "") {
      setShowSnackBar(true);
      return;
    }

    await shortenUrl(pastedURL);

    if (shortUrl) {
      setShowResultComponent(true);
    } else {
      setShowResultComponent(false);
      setPastedURL("");
    }
  };
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
                color: "white",
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

      {showResultComponent && !error && <Result shortUrl={shortUrl} />}
      {showSnackBar && (
        <SnackBar message={error || "قم بإدخال رابط"} color="error" />
      )}
    </>
  );
}
