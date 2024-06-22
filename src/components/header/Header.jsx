import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/Auth/authSlice'
import { useNavigate } from 'react-router-dom';

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const signOut = () => {
       dispatch(logout()) 
       navigate('/login')
    } 

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters> 
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Button 
           onClick={signOut}
          color="inherit">
            Logout
            </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;