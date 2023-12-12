import React from 'react';
import {createTheme, styled, ThemeProvider} from '@mui/material/styles';
import { Container, Grid } from '@mui/material';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'white',
    border: '0px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : 'black',
    padding: theme.spacing(1),
    borderRadius: '10px',
    textAlign: 'center',
  }));

export default function Profile() {
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container 
                maxWidth="md"
                style={{marginTop: 20}}
            >
                <Grid
                    container spacing={0}
                >
                    <Grid xs={12}>
                        <Item> <h3> Profile </h3> </Item>
                        <Item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-start-adornment"
                                defaultValue="TT"
                                label="Name"
                                name="name"
                            />
                        </Item>
                        <Item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-start-adornment"
                                defaultValue="thong85007@gmail.com"
                                label="Email Address"
                                name="email"
                            />
                        </Item>
                        <Item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-start-adornment"
                                defaultValue="1"
                                label="Student ID"
                                name="studentid"
                            />
                        </Item>
                        <Item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="outlined-start-adornment"
                                defaultValue="This account doesn't link yet"
                                label="Link Account"
                                name="linkaccount"
                            >
                            </TextField>
                        </Item>
                        <Item>
                            <Button variant="contained" size="large">
                                Save Change
                            </Button>
                        </Item>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}