//MUI Library
import Box from '@mui/material/Box';

import Snackbar from '@mui/material/Snackbar';
//MUI Library

interface Props {
    message:string,
}

export default function SnackBar({message}:Props) {
    const vertical = 'bottom';
    const horizontal = 'left';
  return (
    <>
      <Box sx={{ width: 500 }}>
        
        <Snackbar
          anchorOrigin={{ vertical, horizontal }}
          open={true}
          message={message}
          key={vertical + horizontal}
          sx={{fontSize:'20px',direction:"rtl"}}
        />
      </Box>
    </>
  );
}
