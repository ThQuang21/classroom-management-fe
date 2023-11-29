import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Web Application Development
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              The course is designed to provide students knowledge in web application
              development. Student will learn how to build a single page application that utilize RESTful
              web service.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Learn now </Button>
              <Button variant="outlined">See more information</Button>
            </Stack>
          </Container>
        </Box>
      </main>
    </>
  );
}