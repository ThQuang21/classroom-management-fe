import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AuthService from "../services/auth.service";
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import GoogleButton from "react-google-button";
import {Divider} from "@mui/material";

const initialValues = {
  email: '',
  password: ''
};

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export default function LogIn() {
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const [alertProps, setAlertProps] = useState({
    open: false,
    message: '',
    severity: 'success', // Default to success
  });
  const handleAlertClose = () => {
    setAlertProps((prev) => ({ ...prev, open: false }));
  };

  const showAlert = (message, severity = 'success') => {
    setAlertProps({
      open: true,
      message,
      severity,
    });

    // Hide the Alert after 4 seconds (4000 milliseconds)
    setTimeout(() => {
      handleAlertClose();
    }, 4000);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values)
    const email = values.email;
    const password = values.password;

    await AuthService.login({email: email, password: password})
      .then(
      (data) => {
        showAlert('Sign-in successful', 'success');

        const user = data.data.data;
        console.log(user)

        localStorage.setItem('email', user.email);
        localStorage.setItem('token', user.accessToken);

        setTimeout(() => {
          navigate('/');
        }, 800);

      },
      (error) => {
        console.log(error)

        if (error.response && error.response.status === 401) {
          showAlert(error.response.data.error.message || 'Invalid email or password. Please try again.', 'error');
        } else {
          showAlert('An unexpected error occurred. Please try again later.', 'error');
        }
      }
    ).finally(() => setSubmitting(false));

  };

  const handleGoogleSignIn = async () => {
    await AuthService.googleLogin();
  }

    return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography style={{ marginBottom: 1 + 'em' }} component="h1" variant="h5">
            Sign in
          </Typography>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>
              <Grid container spacing={2.5}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    required
                    error={Boolean(validationSchema.fields.email && validationSchema.fields.email.errors)}
                    helperText={<ErrorMessage name="email" component="div" className="error-message" />}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    required
                    error={Boolean(validationSchema.fields.password && validationSchema.fields.password.errors)}
                    helperText={<ErrorMessage name="password" component="div" className="error-message" />}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
        <Divider sx={{ mt: 3, mb : 2}}> OR </Divider>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <GoogleButton
            onClick={handleGoogleSignIn}
          />
        </Box>

      </Container>

      <Snackbar
        open={alertProps.open}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleAlertClose} severity={alertProps.severity} sx={{ width: '100%' }}>
          {alertProps.message}
        </Alert>
      </Snackbar>

    </ThemeProvider>
  );
}