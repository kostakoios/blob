import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { register } from '../../redux/Auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

// Material UI Components
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

const isEmail = email =>
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(email)

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [formValid, setFormValid] = useState(null);
  const [success, setSuccess] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const registrationError = useSelector((state) => state.auth.registerError);
  const dispatch = useDispatch();

  const handleFirstName = () => {
    if (!firstName || firstName.length < 3 || firstName.length > 15) {
      setFirstNameError(true);
      return;
    }
    setFirstNameError(false);
  };

  const handleLastName = () => {
    if (!lastName || lastName.length < 3 || lastName.length > 15) {
      setLastNameError(true);
      return;
    }
    setLastNameError(false);
  };

  const handleEmail = () => {
    if (!isEmail(email)) {
      setEmailError(true);
      return;
    }
    setEmailError(false);
  };

  const handlePassword = () => {
    if (!password || password.length < 5 || password.length > 20) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validateRequired = () => {
    if (firstNameError || !firstName) {
      setFormValid("First name is Between 3 - 15 characters long. Please Re-Enter");
      return false;
    }

    if (lastNameError || !lastName) {
      setFormValid("Last name is Between 3 - 15 characters long. Please Re-Enter");
      return false;
    }

    if (emailError || !email) {
      setFormValid("Email is invalid. Please Re-Enter");
      return false;
    }

    if (passwordError || !password) {
      setFormValid("Password is set to 5 - 20 Characters. Please Re-Enter");
      return false;
    }
    setFormValid(null);

    if (!registrationError) {
      setSuccess('Form Submitted Successfully');
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (validateRequired()) {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 3000); // Increased to 3000 milliseconds (3 seconds)

      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: '100vh' }}>
      <Paper sx={{ p: 4, width: '300px' }} elevation={8}>
        <Typography variant="h5" align="center">
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item xs={8}>
              <TextField
                id="register-firstName"
                label="First name"
                error={firstNameError}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={handleFirstName}
                variant="standard"
                fullWidth
                size="small"
                autoComplete="on"
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                id="register-lastName"
                label="Last name"
                error={lastNameError}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={handleLastName}
                variant="standard"
                fullWidth
                size="small"
                autoComplete="on"
              />
            </Grid>

            <Grid item xs={8}>
              <TextField
                id="register-email"
                label="Email"
                error={emailError}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmail}
                variant="standard"
                fullWidth
                size="small"
                autoComplete="on"
              />
            </Grid>

            <Grid item xs={8}>
              <FormControl sx={{ width: '100%' }} variant="standard">
                <InputLabel error={passwordError} htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
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
              <Button type="submit" variant="contained" startIcon={<LoginIcon />} fullWidth>
                SIGN UP
              </Button>
            </Grid>
          </Grid>
        </form>
        <Grid container direction="column" spacing={2}  sx={{ marginTop: '5px' }}>

            <Grid item xs={8}>
              {registrationError && <Alert severity="error">{registrationError}</Alert>}
              {formValid && <Alert severity="error">{formValid}</Alert>}
              {success && <Alert severity="success">{success}</Alert>}
            </Grid>

            <Grid item xs={6}>
              <Link to="/login">Already a User? Login</Link>
            </Grid>
          </Grid>  
      </Paper>
    </Grid>
  );
};

export default Register;