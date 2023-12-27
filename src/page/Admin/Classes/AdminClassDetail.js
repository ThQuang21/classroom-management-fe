import * as React from 'react';
import Typography from "@mui/material/Typography";
import {Divider, IconButton, LinearProgress, List} from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {useEffect, useState} from "react";
import ClassService from "../../../services/class.service";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ListItemPeople from "../../../components/List/ListItemPeople";
import AdminListItemPeople from "../../../components/List/AdminListItemPeople";


export default function AdminClassDetail({classCode}) {
  const [loading, setLoading] = React.useState(true);
  const [classData, setClassData] = React.useState(null);
  const [peopleData, setPeopleData] = React.useState(null);
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
      if (classCode) {
        await ClassService.getClassByClassCode({ classCode: classCode})
          .then((data) => {
            console.log(data.data.data);
            setClassData(data.data.data)
          }, (error) => {
            console.log(error)
            showAlert(error.response.data.error.message || 'An unexpected error occurred. Please try again later.', 'error');
          })
        ;

        await ClassService.listPeopleByClassCode({ classCode: classCode })
          .then((data) => {
            console.log(data.data.data)
            const peopleList = data.data.data
            setPeopleData(peopleList)

            setLoading(false);
          }, (error) => {
          })
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return (
      <>
        <Container sx={{ py: 8 }} maxWidth="md">
          <LinearProgress  />
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
      </>

    )
  }

  return (
    <>
      <TextField id="outlined-basic"
                 label="Class Name"
                 variant="outlined"
                 fullWidth
                 defaultValue={classData.className}
      />

      <Typography variant="h6" gutterBottom>
        Class Owner: {classData.classOwner.name}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Class Code: {classData.classCode}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Invitation Code: {classData.invitationCode}
      </Typography>

      <Typography variant="h6" gutterBottom sx={{ mt : 4 }}>
        Teachers
      </Typography>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {<AdminListItemPeople name={peopleData.classOwner.name} email={peopleData.classOwner.email} note={"Class Owner"} noSetting={true}/>}

        {peopleData.teachers.map((teacher) => (
          teacher.email !== peopleData.classOwner.email && (
            <AdminListItemPeople key={teacher.email} name={teacher.name} email={teacher.email} noSetting={true}/>
          )
        ))}
      </List>

      <Typography variant="h6" gutterBottom sx={{ mt : 4 }}>
        Students
      </Typography>
      <Divider />
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {peopleData.students.length === 0 ? (
          <Typography variant="body1" >There is no student in this class.</Typography>
        ) : (
          peopleData.students.map((card) => (
            <AdminListItemPeople name={card.name} email={card.email} note={card.studentId} />
          ))
        )}
      </List>


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
