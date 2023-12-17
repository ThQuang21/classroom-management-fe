import React, {useState} from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';
// import Box from '@mui/material/Box';
import Grid from '@mui/system/Unstable_Grid';
import styled from '@mui/system/styled';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { red } from '@mui/material/colors';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import LoadingButton from "@mui/lab/LoadingButton";
import AuthService from "../services/auth.service";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    border: '0px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : 'black',
    padding: theme.spacing(1),
    borderRadius: '50px',
    textAlign: 'center',
  }));

const validationSchema = Yup.object({
    name: Yup.string().required('Name is required')
    .max(25, 'Name must be at most 25 characters'),
});

let dataUser = localStorage.getItem('user')
let obj = JSON.parse(dataUser)
console.log(obj)

const initialValues = {
    name: obj.name,
    email: obj.email,
};
console.log(initialValues)

const id = obj.id
let result = obj.email.search(/@gmail.com/i)
console.log(result)

export default function Profile() {
    const defaultTheme = createTheme();
    const [loading, setLoading] = useState(false);
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
    })
        setTimeout(() => {
            handleAlertClose();
        }, 6000);
    };

    const handleSubmit = async (values, {setSubmitting}) => {
        setLoading(true);
        const name = values.name
        const email = values.email

        await AuthService.updateName({name: name, email: email})
            .then(
            (data) => {
                console.log(data)
                obj.name = values.name
                console.log(obj)
                localStorage.setItem('user',JSON.stringify(obj))
                showAlert('Change name successful', 'success');
            },
            (error) => {
                console.log(error)
            }
        ).finally(() => {
            setSubmitting(false);
            setLoading(false)
        })
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container 
                maxWidth="md"
                style={{marginTop: 20}}
            >
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    <Form>
                        <Grid
                            container spacing={0}
                        >
                            <Grid xs={12}>
                                <Item> <h3> User profile </h3> </Item>
                                <Item>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="name"
                                        label="User name"
                                        name="name"
                                        // defaultValue={userName}
                                        // required
                                        // error={Boolean(validationSchema.fields.name && validationSchema.fields.name.errors)}
                                        helperText={<ErrorMessage name="name" component="div" className="error-message" />}
                                    />
                                </Item>
                                <Item>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        // defaultValue={email}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Item>
                                <Item>
                                    <Field
                                        as={TextField}
                                        variant="outlined"
                                        fullWidth
                                        id="studentid"
                                        label="Student ID"
                                        name="studentid"
                                        defaultValue={id}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Item>
                                {
                                    result !== -1 ?
                                        <Item>
                                            <TextField
                                                // as={TextField}
                                                variant="outlined"
                                                fullWidth
                                                id="link"
                                                label="Link account"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <GoogleIcon sx={{ color: red['A700'] }} />
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                }}
                                            />
                                        </Item>
                                    :
                                        <Item>
                                            <TextField
                                                // as={TextField}
                                                variant="outlined"
                                                fullWidth
                                                id="link"
                                                label="Link account"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <FacebookIcon color="primary"/>
                                                        </InputAdornment>
                                                    ),
                                                    readOnly: true,
                                                }}
                                            />
                                        </Item>
                                }
                                <Item>
                                <LoadingButton
                                    type="submit" 
                                    variant="contained" sx={{ mt: 3, mb: 2 }}
                                    loading={loading}
                                >
                                    <span> Save change </span>
                                </LoadingButton>
                                </Item>
                            </Grid>
                        </Grid>
                    </Form>
                </Formik>
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