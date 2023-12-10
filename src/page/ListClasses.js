import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import ClassCard from "../components/Card/ClassCard";
import {useEffect, useState} from "react";
import ClassService from "../services/class.service";
import {useUserStore} from "../context/UserStoreProvider";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ListClasses() {
  const { user } = useUserStore();
  const [loading, setLoading] = React.useState(true);
  const [classData, setClassData] = React.useState([]);
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
    }, 6000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) {
          const req = await ClassService.listClassesByTeacherId({ teacherId: user.id });
          setClassData(req.data.data);
          setLoading(false);
        }
      } catch (error) {
        showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {classData.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                  <ClassCard name = {card.className} teacherName={card.teachers[0].name}/>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

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
    </>
  );
}