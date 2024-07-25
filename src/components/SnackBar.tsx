//MUI Library
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
//MUI Library

interface Props {
  message: string;
  color: "success" | "error";
}


const StyledSnackbar = styled(Snackbar, {
  shouldForwardProp: (prop) => prop !== "color",
})<{ color: "success" | "error" }>(({ color }) => ({
  "& .MuiSnackbarContent-root": {
    backgroundColor: color === "success" ? "#FFA500" : "#F44336",
    color: "white",
    fontSize: "20px",
    direction: "rtl",
  },
}));

export default function SnackBar({ message, color }: Props) {
  const vertical = "bottom";
  const horizontal = "left";

  return (
    <Box sx={{ width: 500 }}>
      <StyledSnackbar
        anchorOrigin={{ vertical, horizontal }}
        open={true}
        message={message}
        key={vertical + horizontal}
        color={color}
        sx={{ marginBottom: "5%" }}
      />
    </Box>
  );
}
