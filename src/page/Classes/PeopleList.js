import * as React from 'react';
import {Divider, IconButton, LinearProgress, List} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemPeople from "../../components/List/ListItemPeople";
import {useEffect} from "react";
import ClassService from "../../services/class.service";
import Container from "@mui/material/Container";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import InviteStudent from "../../components/dialog/InviteStudent";
import InviteTeacher from "../../components/dialog/InviteTeacher";


export default function PeopleList() {
  const classCode = window.location.pathname.split('/').pop(); // Extract classCode from the URL
  const [peopleData, setPeopleData] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [openInviteStudent, setOpenInviteStudent] = React.useState(false);
  const [openInviteTeacher, setOpenInviteTeacher] = React.useState(false);

  const handleOpenInviteStudent = () => {
    setOpenInviteStudent(true);
  };

  const handleOpenInviteTeacher = () => {
    setOpenInviteTeacher(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (classCode) {
        await ClassService.listPeopleByClassCode({ classCode: classCode })
          .then((data) => {
            console.log(data.data.data)
            setPeopleData(data.data.data)
            setLoading(false);
          }, (error) => {
          })

      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [classCode]);

  if (loading) {
    return (
      <>
        <Container sx={{ py: 8 }} maxWidth="md">
          <LinearProgress  />
        </Container>
      </>
    )
  }

  return (
    <>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong>Teachers</strong>
          <IconButton color="primary" aria-label="add people" onClick={handleOpenInviteTeacher}>
            <PersonAddAltIcon sx={{ fontSize: '2rem' }}/>
          </IconButton>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {<ListItemPeople name={peopleData.classOwner.name} email={peopleData.classOwner.email} note={"Class Owner"} noSetting={true}/>}

        {peopleData.teachers.map((teacher) => (
          teacher.email !== peopleData.classOwner.email && (
            <ListItemPeople key={teacher.email} name={teacher.name} email={teacher.email} noSetting={true}/>
          )
        ))}
      </List>

      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong>Students</strong>
          <IconButton color="primary" aria-label="add people" onClick={handleOpenInviteStudent}>
            <PersonAddAltIcon sx={{ fontSize: '2rem' }}/>
          </IconButton>
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Box>

      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {peopleData.students.length === 0 ? (
          <Typography variant="body1" >There is no student in this class.</Typography>
        ) : (
          peopleData.students.map((card) => (
            <ListItemPeople name={card.name} email={card.email} note={card.studentId} />
          ))
        )}
      </List>

      <InviteStudent open={openInviteStudent} setOpen={setOpenInviteStudent}
                     classCode={classCode}
      />
      <InviteTeacher open={openInviteTeacher} setOpen={setOpenInviteTeacher}
                     classCode={classCode}
      />

    </>
  );
}
