//MUI Library
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
// ===MUI Icons===
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// ===MUI Icons===
//MUI Library

//External Librarys
import QRCode from "react-qr-code";
//External Librarys

//Hocks
import { useState } from "react";
import { useRef } from "react";
//Hocks

//Components
import SnackBar from "./SnackBar";
//Components
export default function Result({ shortUrl }: { shortUrl: string }) {
  const theme = useTheme();
  const [showSnackBar, setShowSnackBar] = useState<Boolean>(false);
  //Event Handelers
  const handleCopyClick = () => {
    navigator.clipboard.writeText(shortUrl);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 2000);
  };


  const qrRef = useRef();

  function handleQRCodeDownloadClick() {
    if (qrRef.current) {
      const svg = qrRef.current;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "QRCode";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }
  }

  //Event Handelers

  return (
    <Box
      sx={{
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // padding: 2,
      }}
    >
      <Typography
        variant="h2"
        component="h1"
        style={{
          fontFamily: theme.typography.fontFamily,
          fontWeight: "normal",
        }}
      >
        رابطك جاهز
      </Typography>

      <Grid container sx={{ width: "100%", mt: 5 }}>
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

              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgba(255, 255, 255, 0.6)", // Slightly more opaque on hover
              },
              "& .MuiFilledInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)", // Very light background
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)", // Slightly darker on hover
                },
              },
            }}
            id="filled-basic"
            label="URL"
            variant="filled"
            disabled
            value={shortUrl}
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
            onClick={handleCopyClick}
          >
            <ContentCopyIcon sx={{marginRight: "6px"}} />
            إنسخ الرابط
          </Button>
        </Grid>
      </Grid>

      {/* QR Code */}
      <QRCode ref={qrRef} size={200} value={shortUrl} style={{ marginTop: "20px" }}/>
      <Button
        variant="contained"
        sx={{
          width: "50%",
          marginTop: 2,
          borderRadius: "20px",
          fontFamily: theme.typography.fontFamily,
          fontWeight: "normal",
          bgcolor: "#FFA600",
          color: "#fff",
          "&:hover": {
            bgcolor: "#FF8C00", // Darker orange on hover
          },
          fontSize:"16px",
        }}
        onClick={handleQRCodeDownloadClick}
      >
        <DownloadIcon sx={{marginRight:"6px"}} />
        QR تحميل
      </Button>
      {/* QR Code */}
    {showSnackBar && <SnackBar message="تم نسخ الرابط"/>}

    </Box>
  );
}
