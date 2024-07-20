//MUI Library 
import AppBar from "@mui/material/AppBar";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';

export default function Footer() {
  return (
    <AppBar position="fixed" sx={{ top: 'auto', bottom: 0,  backgroundColor: 'rgba(51, 51, 51, 0.5)',  }}>
      <footer style={{ 
        width: "100%", 
        height: "4rem", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-around" 
      }}>
        <Link href="https://www.linkedin.com/in/abdulmalek-alshetwi-561560202/" underline="none" color="white" target="_blank" rel="noopener noreferrer">
          <IconButton color="inherit">
            <LinkedInIcon />
          </IconButton>
        </Link>
        
        <Link href="https://github.com/AbdulmalekAli60" underline="none" color="white" target="_blank" rel="noopener noreferrer">
          <IconButton color="inherit">
            <GitHubIcon />
          </IconButton>
        </Link>
    
      </footer>
    </AppBar>
  );
}