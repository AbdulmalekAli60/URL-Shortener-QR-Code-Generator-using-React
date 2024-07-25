//MUI Library
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
// ===MUI Icons===
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
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

  const qrRef = useRef<HTMLDivElement>(null);

  function handleQRCodeDownloadClick() {
    if (qrRef.current) {
      const svg = qrRef.current.querySelector("svg");
      if (svg) {
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

          // Generate  filename
          const urlPart = shortUrl.split("/").pop() || "shortlink";
          const timestamp = new Date().toISOString().split("T")[0];
          downloadLink.download = `QR_${urlPart}_${timestamp}.png`;
          // Generate  filename

          downloadLink.href = `${pngFile}`;
          downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
      }
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
        marginBottom: "20%",
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

              "& .MuiFilledInput-underline:hover:not(.Mui-disabled):before": {
                borderBottomColor: "rgba(255, 255, 255, 0.6)",
              },
            }}
            id="filled-basic"
            label="الرابط المختصر"
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
                bgcolor: "#FF8C00",
              },
            }}
            onClick={handleCopyClick}
          >
            <ContentCopyIcon sx={{ marginRight: "6px" }} />
            إنسخ الرابط
          </Button>
        </Grid>
      </Grid>

      {/* QR Code */}
      <div ref={qrRef}>
        <QRCode size={200} value={shortUrl} style={{ marginTop: "20px" }} />
      </div>
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
            bgcolor: "#FF8C00",
          },
          fontSize: "16px",
        }}
        onClick={handleQRCodeDownloadClick}
      >
        <DownloadIcon sx={{ marginRight: "6px" }} />
        QR تحميل
      </Button>
      {/* ===QR Code=== */}
      {showSnackBar && <SnackBar color="success" message="تم نسخ الرابط" />}
    </Box>
  );
}
