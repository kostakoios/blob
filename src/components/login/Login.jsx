import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/Auth/authSlice';

//Material UI Components
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import Checkbox from '@mui/material/Checkbox';

const isEmail = email =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(email)


const Login = () => {
  // Password Field
  const [showPassword, setShowPassword] = useState(false);

  // Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formValid, setFormValid] = useState();
  const [success, setSuccess] = useState();
  const [redirect, setRedirect] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // Input Errors
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Get state isAuthenticated from Redux 
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginError = useSelector((state) => state.auth.loginError);
  const dispatch = useDispatch();

  // Validation for onBlur Email
  const handleEmail = () => {
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  }

  // Validation for onBlur Password
  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  }

  // Password input shown or not shown
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  // Check validation of all fields after clicked on the Submit button
  const validateRequired = () => {
    if (emailError || !email) {
      setFormValid("Email is invalid. Please Re-Enter");
      return false;
    }

    if (passwordError || !password) {
      setFormValid("Password is set to 5 - 20 Characters. Please Re-Enter");
      return false;
    }
    setFormValid(null);

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    // Handle the login logic here
    if (validateRequired()) {
      // Dispatch your login action or handle login logic here
      console.log('email, password, rememberMe: ', email, password, rememberMe)
      dispatch(login(email, password, rememberMe));
    }
  };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     setFormValid(null);
  //     setSuccess('Form Submitted Successfully');
  //     const timer = setTimeout(() => {
  //       setRedirect(true);
  //     }, 1000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isAuthenticated]);

  if (isAuthenticated) {
    return <Navigate to='/home/folders' />;
  }

  return (
    <Grid container direction="row" justifyContent="center"
      alignItems="center" sx={{ height: '100vh' }}>
      <Paper sx={{ p: 4, width: '300px' }} elevation={8}>
        <Typography variant="h5" align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs={8}>
              <TextField id="register-email"
                label="Email"
                error={emailError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmail}
                autoComplete="on"
                variant="standard"
                fullWidth
                size="small" />
            </Grid>

            <Grid item xs={8}>
              <FormControl sx={{ width: '100%' }} variant="standard">
                <InputLabel error={passwordError} htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  error={passwordError}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePassword}
                  autoComplete="on"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>

            <Grid item xs={8}>

              <InputLabel>
                <Checkbox sx={{ p: 0, mr: '5px' }}
                  onChange={(event) => setRememberMe(event.target.checked)}
                  inputProps={{ 'aria-label': 'controlled' }}
                /> Remember me</InputLabel>
            </Grid>

            <Grid item xs={8}>
              <Button type="submit" variant="contained" startIcon={<LoginIcon />} fullWidth>
                SIGN UP
              </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container direction="column" spacing={2} sx={{ marginTop: '5px' }}>

          <Grid item xs={8}>
            {loginError != "" && <Alert severity="error">{loginError}</Alert>}
            {formValid && <Alert severity="error">{formValid}</Alert>}
            {success && <Alert severity="success">{success}</Alert>}
          </Grid>

          <Grid item xs={6}>
            <Link to="/register">Not a User? Register</Link>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Login;