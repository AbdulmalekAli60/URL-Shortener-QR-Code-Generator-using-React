//MUI Library
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
//MUI Library

export default function Loader({ open }: { open: boolean }) {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff" }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
