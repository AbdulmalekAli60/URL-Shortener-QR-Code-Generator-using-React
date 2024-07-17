//MUI Components
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";

//MUI Components

export default function ExcuteBtn() {
  const xxx = () => {
    alert("Paset URL");
  };
  const theme = useTheme();

  return (
    <>
    {/* This Button will make the Api call, and will show the QR code and short url section "Result" */}
      <Button
        variant="contained"
        sx={{
          width: "50%",
          margin: "20px 0 0 0",
          borderRadius: "20px",
          fontFamily: theme.typography.fontFamily,
          fontWeight: "normal",
          bgcolor: '#FFA600',
          color: 'white',
          '&:hover': {
            bgcolor: '#FF8C00' // Darker orange on hover
          }
        }}
        onClick={xxx}
      >
        تنفيذ
      </Button>
    </>
  );
}
